// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBnHhIu-BU10YVrqWaitMTE6ZDArp_xhI",
  authDomain: "sabzigo-2a2dc.firebaseapp.com",
  projectId: "sabzigo-2a2dc",
  storageBucket: "sabzigo-2a2dc.firebasestorage.app",
  messagingSenderId: "395661220461",
  appId: "1:395661220461:web:cacc5b82055eb35cb43d64",
  measurementId: "G-PXR1S16SJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
