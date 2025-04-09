import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCZJ8m8zRHFvKI0G_RM7PEd3iXG8rXj9_E",
  authDomain: "adam-khaled-website.firebaseapp.com",
  databaseURL: "https://adam-khaled-website-default-rtdb.firebaseio.com",
  projectId: "adam-khaled-website",
  storageBucket: "adam-khaled-website.firebasestorage.app",
  messagingSenderId: "813806131200",
  appId: "1:813806131200:web:a300f169926a8bd6ade0e5",
  measurementId: "G-82C0QL38FH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Get a reference to the database service
export const database = getDatabase(app);

export { analytics };
export default app;