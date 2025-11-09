// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQJJkhEwIKfYbweXvT1l9ZGEA8bU7ImmE",
  authDomain: "power-bi-nexus.firebaseapp.com",
  projectId: "power-bi-nexus",
  storageBucket: "power-bi-nexus.firebasestorage.app",
  messagingSenderId: "641727507871",
  appId: "1:641727507871:web:5a120094300ff18eec61aa",
  databaseURL: "https://power-bi-nexus-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase (will be used by upvotes.js and rss-carousel.js)
let firebaseApp = null;
let database = null;
let firestore = null;

function initializeFirebase() {
  try {
    // Check if Firebase is loaded
    if (typeof firebase === 'undefined') {
      console.warn('Firebase SDK not loaded. Features will be disabled.');
      return false;
    }

    // Initialize Firebase app
    if (!firebase.apps.length) {
      firebaseApp = firebase.initializeApp(firebaseConfig);
    } else {
      firebaseApp = firebase.app();
    }

    // Initialize Realtime Database (for upvotes)
    database = firebase.database();
    
    // Initialize Firestore (for RSS feeds)
    firestore = firebase.firestore();
    
    console.log('Firebase initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    return false;
  }
}

// Export for use in other scripts
window.firebaseInitialized = false;
window.getFirebaseDatabase = function() {
  if (!window.firebaseInitialized) {
    window.firebaseInitialized = initializeFirebase();
  }
  return database;
};

window.getFirestore = function() {
  if (!window.firebaseInitialized) {
    window.firebaseInitialized = initializeFirebase();
  }
  return firestore;
};
