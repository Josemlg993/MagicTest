// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4BlVmfZEj-5JhT44dqSaGo5Tt-pxt8lI",
  authDomain: "magic-test-d4241.firebaseapp.com",
  projectId: "magic-test-d4241",
  storageBucket: "magic-test-d4241.appspot.com",
  messagingSenderId: "672187917157",
  appId: "1:672187917157:web:f22d6a7eaf8c9a461e778c",
  measurementId: "G-E69R6SPV0T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
