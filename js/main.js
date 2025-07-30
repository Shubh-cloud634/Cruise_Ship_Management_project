import { auth } from "../firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

window.login = async function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login Successful!");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Login Failed: " + error.message);
  }
};

window.register = async function () {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Registration Successful!");
    window.location.href = "index.html";
  } catch (error) {
    alert("Registration Failed: " + error.message);
  }
};
