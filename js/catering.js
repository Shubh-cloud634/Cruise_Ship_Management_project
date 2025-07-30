// js/catering.js

import { auth, db } from "../firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Wait for auth state
onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Not logged in. Redirecting...");
    window.location.href = "index.html";
    return;
  }

  // Form submit
  const form = document.getElementById("cateringForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectedItems = Array.from(
      document.querySelectorAll("input[name='item']:checked")
    ).map((el) => el.value);

    if (selectedItems.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    try {
      await addDoc(collection(db, "cateringOrders"), {
        voyagerId: user.uid,
        items: selectedItems,
        timestamp: serverTimestamp()
      });

      alert("✅ Order placed!");
      form.reset();
    } catch (err) {
      console.error("Firestore error:", err);
      alert("❌ Failed to place order: " + err.message);
    }
  });
});
