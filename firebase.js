// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// ✅ Replace values with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCKIv_J5ns60XAqeftkQBo0CwiNhJnClMg",
  authDomain: "cruise-ship-management-5aaee.firebaseapp.com",
  projectId: "cruise-ship-management-5aaee",
  storageBucket: "cruise-ship-management-5aaee.appspot.com",
  messagingSenderId: "927972848337",
  appId: "1927972848337:web:0b6786a12458c3686e4bf0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
