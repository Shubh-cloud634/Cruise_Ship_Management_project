// js/fitness.js

import { auth, db } from "../firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Wait for user to be authenticated
onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Please login first.");
    window.location.href = "index.html";
    return;
  }

  const form = document.getElementById("fitnessForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const equipment = form.equipment.value.trim();
    const time = form.time.value;

    if (!equipment || !time) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "fitnessBookings"), {
        voyagerId: user.uid,
        equipment,
        time,
        timestamp: serverTimestamp()
      });

      alert("✅ Fitness booking confirmed!");
      form.reset();
    } catch (err) {
      console.error("Error booking fitness:", err);
      alert("❌ Failed to book: " + err.message);
    }
  });
});
