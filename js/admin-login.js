// js/admin-login.js

import { auth } from "../firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Hardcoded email (or later can be checked from Firestore "admin" list)
const allowedAdmins = ["admin@cruise.com","test@gmail.com"];

window.adminLogin = async function () {
  const email = document.getElementById("admin-email").value;
  const password = document.getElementById("admin-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    if (!allowedAdmins.includes(email)) {
      alert("Access denied: Not an admin");
      return;
    }

    alert("✅ Login successful!");
    window.location.href = "admin-dashboard.html";
  } catch (err) {
    alert("❌ Login failed: " + err.message);
  }
};
