// Upvote system for resources table
// Uses Firebase Realtime Database for storing votes
// Implements session-based voting restrictions (1 vote per resource per session)

class UpvoteManager {
  constructor() {
    this.database = null;
    this.votesRef = null;
    this.sessionKey = this.getOrCreateSessionKey();
    this.votedResources = this.loadVotedResources();
    this.voteCounts = {};
    this.initialized = false;
  }

  // Generate or retrieve a unique session key
  getOrCreateSessionKey() {
    let sessionKey = sessionStorage.getItem('upvote_session_key');
    if (!sessionKey) {
      // Create a unique session key combining timestamp and random string
      sessionKey = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('upvote_session_key', sessionKey);
    }
    return sessionKey;
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

    if (this.hasVoted(resourceId)) {
      console.log('Already voted for this resource');
      return false;
    }

    try {
      // Add vote to Firebase
      const voteRef = this.votesRef.child(resourceId).child(this.sessionKey);
      await voteRef.set({
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        resourceName: resourceName
      });

      // Mark as voted in session storage
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
