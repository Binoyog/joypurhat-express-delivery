import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

/* ADMIN LOGIN */
window.adminLogin = function () {
  const phone = document.getElementById("adminPhone").value;
  const pass = document.getElementById("adminPass").value;

  if (phone === "01734289027" && pass === "123456") {
    localStorage.setItem("admin", "true");
    window.location.href = "admin-dashboard.html";
  } else {
    alert("❌ Admin Login Failed");
  }
};

/* ADD PRODUCT */
window.addProduct = async function () {
  const name = document.getElementById("productName").value;
  const category = document.getElementById("productCategory").value;
  const price = document.getElementById("productPrice").value;

  if (!name || !category || !price) {
    alert("সব ফিল্ড পূরণ করুন");
    return;
  }

  try {
    await addDoc(collection(db, "products"), {
      name,
      category,
      price: Number(price),
      createdAt: serverTimestamp(),
      status: "active"
    });

    alert("✅ Product Added Successfully");
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";

  } catch (e) {
    alert("❌ Error: " + e.message);
  }
};
