/**
 * RSS Feed Carousel Widget
 * Displays recent RSS feed items from Firebase in a carousel format
 */

class RSSCarousel {
  constructor(containerId) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.items = [];
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.isPlaying = true;
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

    // Start autoplay
    this.startAutoPlay();
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
          category: data.category || 'Blog'
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
        <div class="rss-carousel-header">
          <h3>Latest from the Power BI Community</h3>
          <div class="rss-carousel-controls">
            <button class="rss-control-btn" id="rss-play-pause" title="${this.isPlaying ? 'Pause' : 'Play'}">
              <span class="rss-control-icon">${this.isPlaying ? '⏸' : '▶'}</span>
            </button>
            <button class="rss-control-btn" id="rss-prev" title="Previous">
              <span class="rss-control-icon">◀</span>
            </button>
            <button class="rss-control-btn" id="rss-next" title="Next">
              <span class="rss-control-icon">▶</span>
            </button>
          </div>
        </div>
        <div class="rss-carousel-track">
          <div class="rss-carousel-items" id="rss-carousel-items">
            ${this.renderItems()}
          </div>
        </div>
        <div class="rss-carousel-dots" id="rss-carousel-dots">
          ${this.renderDots()}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.attachEventListeners();
    this.showItem(0);
  }

  // Render carousel items
  renderItems() {
    return this.items.map((item, index) => `
      <div class="rss-item" data-index="${index}">
        <div class="rss-item-content">
          <span class="rss-item-category ${item.category.toLowerCase()}">${item.category}</span>
          <h4 class="rss-item-title">
            <a href="${this.escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer">
              ${this.escapeHtml(item.title)}
            </a>
          </h4>
          <p class="rss-item-snippet">${this.escapeHtml(item.contentSnippet)}</p>
          <div class="rss-item-meta">
            <span class="rss-item-source">${this.escapeHtml(item.source)}</span>
            <span class="rss-item-date">${this.formatDate(item.pubDate)}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render navigation dots
  renderDots() {
    return this.items.map((_, index) => `
      <button class="rss-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
    `).join('');
  }

  // Show specific item
  showItem(index) {
    const items = this.container.querySelectorAll('.rss-item');
    const dots = this.container.querySelectorAll('.rss-dot');

    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    this.currentIndex = index;
  }

  // Navigate to next item
  next() {
    const nextIndex = (this.currentIndex + 1) % this.items.length;
    this.showItem(nextIndex);
  }

  // Navigate to previous item
  prev() {
    const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.showItem(prevIndex);
  }

  // Toggle autoplay
  toggleAutoPlay() {
    if (this.isPlaying) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  // Start autoplay
  startAutoPlay() {
    this.isPlaying = true;
    this.autoPlayInterval = setInterval(() => this.next(), 5000); // 5 seconds
    
    const playPauseBtn = document.getElementById('rss-play-pause');
    if (playPauseBtn) {
      playPauseBtn.querySelector('.rss-control-icon').textContent = '⏸';
      playPauseBtn.title = 'Pause';
    }
  }

  // Stop autoplay
  stopAutoPlay() {
    this.isPlaying = false;
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }

    const playPauseBtn = document.getElementById('rss-play-pause');
    if (playPauseBtn) {
      playPauseBtn.querySelector('.rss-control-icon').textContent = '▶';
      playPauseBtn.title = 'Play';
    }
  }

  // Attach event listeners
  attachEventListeners() {
    // Play/Pause button
    const playPauseBtn = document.getElementById('rss-play-pause');
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => this.toggleAutoPlay());
    }

    // Previous button
    const prevBtn = document.getElementById('rss-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.stopAutoPlay();
        this.prev();
      });
    }

    // Next button
    const nextBtn = document.getElementById('rss-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.stopAutoPlay();
        this.next();
      });
    }

    // Dots navigation
    const dots = this.container.querySelectorAll('.rss-dot');
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        this.stopAutoPlay();
        const index = parseInt(dot.dataset.index);
        this.showItem(index);
      });
    });

    // Pause on hover
    const carousel = this.container.querySelector('.rss-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => {
        if (this.isPlaying) {
          this.stopAutoPlay();
          this.wasPlayingBeforeHover = true;
        }
      });

      carousel.addEventListener('mouseleave', () => {
        if (this.wasPlayingBeforeHover) {
          this.startAutoPlay();
          this.wasPlayingBeforeHover = false;
        }
      });
    }
  }

  // Format date
  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  // Escape HTML
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize carousel on homepage
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize on homepage
  if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
    // Wait for Firebase to be ready
    setTimeout(async () => {
      const carousel = new RSSCarousel('rss-carousel-widget');
      await carousel.init();
    }, 1000);
  }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RSSCarousel;
}
