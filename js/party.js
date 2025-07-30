// js/party.js

import { auth, db } from "../firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Wait for user
onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Please login first.");
    window.location.href = "index.html";
    return;
  }

  const form = document.getElementById("partyForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const partyType = form.partyType.value;

    if (!partyType) {
      alert("Please select a party type.");
      return;
    }

    try {
      await addDoc(collection(db, "partyBookings"), {
        voyagerId: user.uid,
        partyType,
        timestamp: serverTimestamp()
      });

      alert("✅ Party hall booked!");
      form.reset();
    } catch (err) {
      console.error("Error booking party hall:", err);
      alert("❌ Failed to book: " + err.message);
    }
  });
});
