import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Allowed emails per role
const roleEmails = {
  voyager: ["voyager@crusie.com"],
  admin: ["admin@crusie.com"],
  manager: ["manager@crusie.com"],
  headcook: ["cook@crusie.com"],
  supervisor: ["supervisor@crusie.com"]
};

document.getElementById("loginBtn").addEventListener("click", async () => {
  const role = document.getElementById("roleSelect").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!role) {
    alert("Please select a role");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

    if (!roleEmails[role].includes(email)) {
      alert("Access denied for this role");
      return;
    }

    const rolePages = {
      voyager: "dashboard.html",
      admin: "admin/admin-dashboard.html",
      manager: "manager/manager-dashboard.html",
      headcook: "headcook/headcook-dashboard.html",
      supervisor: "supervisor/supervisor-dashboard.html"
    };

    window.location.href = rolePages[role];
  } catch (err) {
    alert("Login failed: " + err.message);
  }
});
