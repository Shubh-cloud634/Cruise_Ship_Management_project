// admin/js/register-voyager.js

import { auth } from "../../firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const form = document.getElementById("voyagerRegisterForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("voyagerEmail").value;
  const password = document.getElementById("voyagerPassword").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("✅ Voyager account created successfully!");
    form.reset();
  } catch (err) {
    console.error("Error:", err);
    alert("❌ Failed to create voyager: " + err.message);
  }
});
