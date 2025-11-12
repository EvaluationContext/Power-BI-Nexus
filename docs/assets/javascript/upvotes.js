// Upvote system for resources table
// Uses Firebase Realtime Database for storing votes
// Implements IP-based voting restrictions (1 vote per resource per IP address)

class UpvoteManager {
  constructor() {
    this.database = null;
    this.votesRef = null;
    this.ipHash = null;
    this.votedResources = this.loadVotedResources();
    this.voteCounts = {};
    this.initialized = false;
  }

  // Get IP address hash for voting
  async getIpHash() {
    if (this.ipHash) {
      return this.ipHash;
    }

    // Check if we have a cached IP hash in localStorage
    const cachedHash = localStorage.getItem('upvote_ip_hash');
    const cacheTime = localStorage.getItem('upvote_ip_hash_time');
    const now = Date.now();
    
    // Use cached hash if less than 24 hours old
    if (cachedHash && cacheTime && (now - parseInt(cacheTime) < 24 * 60 * 60 * 1000)) {
      this.ipHash = cachedHash;
      return this.ipHash;
    }

    try {
      // Use ipify API to get IP address
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      const ip = data.ip;
      
      // Create a hash of the IP address (simple hash for privacy)
      const hash = await this.hashString(ip);
      this.ipHash = hash;
      
      // Cache the hash
      localStorage.setItem('upvote_ip_hash', hash);
      localStorage.setItem('upvote_ip_hash_time', now.toString());
      
      return hash;
    } catch (error) {
      console.warn('Could not fetch IP address, using fallback:', error);
      // Fallback to browser fingerprint-based hash
      const fallback = await this.getFallbackHash();
      this.ipHash = fallback;
      return fallback;
    }
  }

  // Create hash from string
  async hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex.substring(0, 32); // Use first 32 chars
  }

  // Fallback hash based on browser fingerprint
  async getFallbackHash() {
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width,
      screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency || 0
    ].join('|');
    
    return await this.hashString(fingerprint);
  }

  // Load voted resources from session storage
  loadVotedResources() {
    const stored = sessionStorage.getItem('voted_resources');
    return stored ? JSON.parse(stored) : {};
  }

  // Save voted resources to session storage
  saveVotedResources() {
    sessionStorage.setItem('voted_resources', JSON.stringify(this.votedResources));
  }

  // Initialize Firebase connection
  async initialize() {
    if (this.initialized) {
      return true;
    }

    this.database = window.getFirebaseDatabase();
    if (!this.database) {
      console.warn('Firebase database not available. Upvoting disabled.');
      return false;
    }

    this.votesRef = this.database.ref('resource_votes');
    this.initialized = true;

    // Get IP hash for voting
    await this.getIpHash();

    // Check which resources this IP has voted for
    await this.loadIpVotes();

    // Listen for vote changes in real-time
    this.votesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.voteCounts = data;
        this.updateAllVoteCounts();
      }
    });

    return true;
  }

  // Load votes for this IP address
  async loadIpVotes() {
    if (!this.ipHash) return;

    try {
      const snapshot = await this.votesRef.once('value');
      const allVotes = snapshot.val() || {};
      
      // Check each resource for votes from this IP
      Object.keys(allVotes).forEach(resourceId => {
        const votes = allVotes[resourceId];
        if (votes && votes[this.ipHash]) {
          this.votedResources[resourceId] = true;
        }
      });

      // Save to session storage for faster lookups
      this.saveVotedResources();
    } catch (error) {
      console.error('Error loading IP votes:', error);
    }
  }

  // Create a unique resource ID from the resource name
  getResourceId(resourceName) {
    return resourceName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
  }

  // Check if user has already voted for this resource
  hasVoted(resourceId) {
    return this.votedResources[resourceId] === true;
  }

  // Get current vote count for a resource
  getVoteCount(resourceId) {
    if (!this.voteCounts[resourceId]) {
      return 0;
    }
    return Object.keys(this.voteCounts[resourceId]).length;
  }

  // Upvote a resource
  async upvote(resourceId, resourceName) {
    if (!this.initialized) {
      console.error('UpvoteManager not initialized');
      return false;
    }

    if (!this.ipHash) {
      console.error('IP hash not available');
      return false;
    }

    if (this.hasVoted(resourceId)) {
      console.log('Already voted for this resource from this IP');
      return false;
    }

    try {
      // Check if this IP has already voted (double-check on server side)
      const existingVote = await this.votesRef
        .child(resourceId)
        .child(this.ipHash)
        .once('value');
      
      if (existingVote.exists()) {
        console.log('Vote already exists in database');
        this.votedResources[resourceId] = true;
        this.saveVotedResources();
        return false;
      }

      // Add vote to Firebase using IP hash as key
      const voteRef = this.votesRef.child(resourceId).child(this.ipHash);
      await voteRef.set({
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        resourceName: resourceName
      });

      // Mark as voted in local storage
      this.votedResources[resourceId] = true;
      this.saveVotedResources();

      return true;
    } catch (error) {
      console.error('Error upvoting:', error);
      return false;
    }
  }

  // Create upvote button HTML
  createUpvoteButton(resourceName, resourceId) {
    const voteCount = this.getVoteCount(resourceId);
    const hasVoted = this.hasVoted(resourceId);
    const disabledClass = hasVoted ? 'voted' : '';
    const disabledAttr = hasVoted ? 'disabled' : '';

    return `
      <div class="upvote-container" data-resource-id="${resourceId}">
        <button class="upvote-btn ${disabledClass}" 
                data-resource-id="${resourceId}" 
                data-resource-name="${this.escapeHtml(resourceName)}"
                ${disabledAttr}
                title="${hasVoted ? 'You have already voted' : 'Upvote this resource'}">
          <svg class="upvote-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" /></svg>
        </button>
        <span class="vote-count" data-resource-id="${resourceId}">${voteCount}</span>
      </div>
    `;
  }

  // Update vote count display for a specific resource
  updateVoteCount(resourceId) {
    const voteCount = this.getVoteCount(resourceId);
    const countElements = document.querySelectorAll(`.vote-count[data-resource-id="${resourceId}"]`);
    countElements.forEach(el => {
      el.textContent = voteCount;
    });

    // Update button state if user has voted
    if (this.hasVoted(resourceId)) {
      const buttons = document.querySelectorAll(`.upvote-btn[data-resource-id="${resourceId}"]`);
      buttons.forEach(btn => {
        btn.classList.add('voted');
        btn.disabled = true;
        btn.title = 'You have already voted';
      });
    }
  }

  // Update all vote counts in the table
  updateAllVoteCounts() {
    Object.keys(this.voteCounts).forEach(resourceId => {
      this.updateVoteCount(resourceId);
    });
  }

  // Handle upvote button click
  async handleUpvoteClick(event) {
    const button = event.target.closest('.upvote-btn');
    if (!button || button.disabled) {
      return;
    }

    const resourceId = button.dataset.resourceId;
    const resourceName = button.dataset.resourceName;

    // Add loading state
    button.classList.add('loading');
    button.disabled = true;

    const success = await this.upvote(resourceId, resourceName);

    if (success) {
      button.classList.remove('loading');
      button.classList.add('voted');
      button.title = 'You have already voted';
      
      // Animate the vote
      button.classList.add('vote-animation');
      setTimeout(() => button.classList.remove('vote-animation'), 600);
    } else {
      button.classList.remove('loading');
      button.disabled = false;
    }
  }

  // Escape HTML to prevent XSS
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Set up event listeners
  setupEventListeners() {
    document.addEventListener('click', (event) => {
      if (event.target.closest('.upvote-btn')) {
        this.handleUpvoteClick(event);
      }
    });
  }

  // Get vote count for sorting (used by DataTables)
  getVoteCountForSort(resourceId) {
    return this.getVoteCount(resourceId);
  }
}

// Create global instance
window.upvoteManager = new UpvoteManager();

// Initialize when Firebase is ready
document.addEventListener('DOMContentLoaded', async () => {
  // Wait a bit for Firebase to load
  setTimeout(async () => {
    const initialized = await window.upvoteManager.initialize();
    if (initialized) {
      window.upvoteManager.setupEventListeners();
      console.log('Upvote system initialized');
    }
  }, 500);
});
