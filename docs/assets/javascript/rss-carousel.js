/**
 * RSS Feed Carousel Widget
 * Displays recent RSS feed items from Firebase in a carousel format
 */

class RSSCarousel {
  constructor(containerId) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.items = [];
    this.currentPage = 0;
    this.autoScrollInterval = null;
    this.autoScrollDelay = 5000; // 5 seconds between auto-scrolls
  }

  // Initialize the carousel
  async init() {
    if (!this.container) {
      console.warn('RSS Carousel container not found');
      return;
    }

    // Show loading state
    this.showLoading();

    // Fetch RSS items from Firebase
    await this.fetchRSSItems();

    // Render carousel
    this.render();
    
    // Start auto-scroll
    this.startAutoScroll();
  }

  // Fetch RSS items from Firebase Firestore
  async fetchRSSItems() {
    try {
      const db = window.getFirestore();
      if (!db) {
        throw new Error('Firestore not initialized');
      }

      // Query the rssItems collection, ordered by pubDate descending
      const querySnapshot = await db.collection('rssItems')
        .orderBy('pubDate', 'desc')
        .limit(50) // Limit to most recent 50 items
        .get();

      this.items = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.items.push({
          title: data.title || 'Untitled',
          link: data.link || '#',
          pubDate: data.pubDate || new Date().toISOString(),
          contentSnippet: data.contentSnippet || '',
          author: data.author || data.source,
          source: data.source || 'Unknown',
          category: data.category || 'Blog',
          imageUrl: data.imageUrl || ''
        });
      });

      console.log(`✅ Loaded ${this.items.length} RSS items from Firestore`);
    } catch (error) {
      console.error('Error fetching RSS items:', error);
      this.items = [];
    }
  }

  // Show loading state
  showLoading() {
    this.container.innerHTML = `
      <div class="rss-carousel-loading">
        <div class="loading-spinner"></div>
        <p>Loading latest content...</p>
      </div>
    `;
  }

  // Render the carousel
  render() {
    if (this.items.length === 0) {
      this.container.innerHTML = `
        <div class="rss-carousel-empty">
          <p>No recent content available. Check back soon!</p>
        </div>
      `;
      return;
    }

    const html = `
      <div class="rss-carousel">
        <h2 class="rss-carousel-title">Latest from the Community</h2>
        <div class="rss-carousel-track">
          <button class="rss-control-btn rss-nav-prev" id="rss-prev" title="Previous">
            <span class="rss-control-icon">◀</span>
          </button>
          <button class="rss-control-btn rss-nav-next" id="rss-next" title="Next">
            <span class="rss-control-icon">▶</span>
          </button>
          <div class="rss-carousel-items" id="rss-carousel-items">
            ${this.renderItems()}
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.attachEventListeners();
    this.currentPage = 0;
    this.showPage(0);
  }

  // Render carousel items - 3 per page
  renderItems() {
    return this.items.map((item, index) => `
      <div class="rss-item" data-index="${index}">
        ${item.imageUrl ? `
          <div class="rss-item-image">
            <a href="${this.escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer">
              <img src="${this.escapeHtml(item.imageUrl)}" alt="${this.escapeHtml(item.title)}" loading="lazy">
            </a>
          </div>
        ` : ''}
        <div class="rss-item-content">
          <h4 class="rss-item-title">
            <a href="${this.escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer">
              ${this.escapeHtml(item.title)}
            </a>
          </h4>
          ${item.contentSnippet ? `<p class="rss-item-snippet">${this.escapeHtml(item.contentSnippet)}</p>` : ''}
          <div class="rss-item-meta">
            <span class="rss-item-source">${this.escapeHtml(item.source)}</span>
            <span class="rss-item-date">${this.formatDate(item.pubDate)}</span>
          </div>
          <span class="rss-item-category ${item.category.toLowerCase()}">${item.category}</span>
        </div>
      </div>
    `).join('');
  }

  // Show specific page (responsive items per page)
  showPage(pageIndex) {
    const itemsPerPage = this.getItemsPerPage();
    const items = this.container.querySelectorAll('.rss-item');
    const totalPages = Math.ceil(this.items.length / itemsPerPage);
    
    // Ensure pageIndex is within bounds
    pageIndex = Math.max(0, Math.min(pageIndex, totalPages - 1));
    this.currentPage = pageIndex;
    
    const startIndex = pageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    items.forEach((item, i) => {
      item.classList.toggle('active', i >= startIndex && i < endIndex);
    });
    
    // Update navigation button states
    const prevBtn = document.getElementById('rss-prev');
    const nextBtn = document.getElementById('rss-next');
    
    if (prevBtn) {
      prevBtn.disabled = pageIndex === 0;
      prevBtn.style.opacity = pageIndex === 0 ? '0.3' : '1';
    }
    
    if (nextBtn) {
      nextBtn.disabled = pageIndex === totalPages - 1;
      nextBtn.style.opacity = pageIndex === totalPages - 1 ? '0.3' : '1';
    }
  }

  // Get items per page based on screen size
  getItemsPerPage() {
    const width = window.innerWidth;
    if (width <= 767) return 1;   // Mobile (up to medium tablet): 1 item
    if (width <= 991) return 2;   // Large tablet: 2 items
    return 3;                      // Desktop: 3 items
  }

  // Navigate to next page
  next() {
    const itemsPerPage = this.getItemsPerPage();
    const totalPages = Math.ceil(this.items.length / itemsPerPage);
    const nextPage = Math.min(this.currentPage + 1, totalPages - 1);
    this.showPage(nextPage);
  }

  // Navigate to previous page
  prev() {
    const prevPage = Math.max(this.currentPage - 1, 0);
    this.showPage(prevPage);
    this.resetAutoScroll(); // Reset auto-scroll timer on manual navigation
  }

  // Start auto-scroll
  startAutoScroll() {
    // Clear any existing interval
    this.stopAutoScroll();
    
    // Start new interval
    this.autoScrollInterval = setInterval(() => {
      const itemsPerPage = this.getItemsPerPage();
      const totalPages = Math.ceil(this.items.length / itemsPerPage);
      
      // Go to next page, or loop back to first page
      if (this.currentPage < totalPages - 1) {
        this.next();
      } else {
        this.showPage(0); // Loop back to first page
      }
    }, this.autoScrollDelay);
  }

  // Stop auto-scroll
  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  // Reset auto-scroll (called when user manually navigates)
  resetAutoScroll() {
    this.stopAutoScroll();
    this.startAutoScroll();
  }

  // Attach event listeners
  attachEventListeners() {
    // Previous button
    const prevBtn = document.getElementById('rss-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prev());
    }

    // Next button
    const nextBtn = document.getElementById('rss-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.next();
        this.resetAutoScroll(); // Reset auto-scroll timer on manual navigation
      });
    }

    // Pause auto-scroll on hover
    const carousel = this.container.querySelector('.rss-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => this.stopAutoScroll());
      carousel.addEventListener('mouseleave', () => this.startAutoScroll());
    }

    // Handle window resize to adjust items per page
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Re-render current page with new items per page
        this.showPage(this.currentPage);
      }, 250);
    });
  }

  // Format date
  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    
    // Get start of today (midnight) in local timezone
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // Get start of the date in question (midnight) in local timezone
    const dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    // Calculate difference in days based on calendar days, not 24-hour periods
    const diffMs = todayStart - dateStart;
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 14) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  // Escape HTML
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize carousel
function initializeCarousel() {
  const carouselWidget = document.getElementById('rss-carousel-widget');
  
  if (carouselWidget && !carouselWidget.dataset.initialized) {
    console.log('RSS Carousel widget found, initializing...');
    carouselWidget.dataset.initialized = 'true';
    
    // Wait for Firebase to be ready
    setTimeout(async () => {
      const carousel = new RSSCarousel('rss-carousel-widget');
      await carousel.init();
    }, 1000);
  } else if (!carouselWidget) {
    console.log('RSS Carousel widget not found on this page');
  } else {
    console.log('RSS Carousel already initialized');
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeCarousel);

// Handle Material theme instant navigation - use the document$ observable
if (typeof document$ !== 'undefined') {
  document$.subscribe(function() {
    console.log('Navigation detected, checking for carousel...');
    // Small delay to ensure DOM is updated
    setTimeout(initializeCarousel, 100);
  });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RSSCarousel;
}
