// js/resort.js

import { auth, db } from "../firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Wait for auth
onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Please login first.");
    window.location.href = "index.html";
    return;
  }

  const form = document.getElementById("resortForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const resortType = form.resortType.value;
    const movieTitle = form.movieTitle.value.trim();

    if (!resortType || !movieTitle) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "resortBookings"), {
        voyagerId: user.uid,
        resortType,
        movieTitle,
        timestamp: serverTimestamp()
      });

      alert("✅ Resort & Movie booking confirmed!");
      form.reset();
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Failed to book: " + err.message);
    }
  });
});
