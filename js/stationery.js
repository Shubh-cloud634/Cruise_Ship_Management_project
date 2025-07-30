// js/stationery.js
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
    alert("Please login first.");
    window.location.href = "index.html";
    return;
  }

  const form = document.getElementById("stationeryForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectedItems = Array.from(
      form.querySelectorAll("input[name='item']:checked")
    ).map((el) => el.value);

    if (selectedItems.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    try {
      await addDoc(collection(db, "stationeryOrders"), {
        voyagerId: user.uid,
        items: selectedItems,
        timestamp: serverTimestamp()
      });

      alert("✅ Stationery order placed!");
      form.reset();
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Failed to place order: " + err.message);
    }
  });
});
