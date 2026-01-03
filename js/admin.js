import { getAuth, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import { app } from "./firebase.js";

const auth = getAuth(app);

/* ===============================
   ADMIN LOGIN
================================ */
window.adminLogin = async function () {
  const phone = document.getElementById("adminPhone").value.trim();
  const password = document.getElementById("adminPassword").value;

  if (!phone || !password) {
    alert("সব তথ্য দিন");
    return;
  }

  // phone → email trick (GitHub Pages safe)
  const email = phone + "@admin.local";

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "admin-dashboard.html";
  } catch (error) {
    alert("❌ Admin Login Failed");
    console.error(error);
  }
};
