// admin.js
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

import { app } from "./firebase.js";

const db = getFirestore(app);

/* ===============================
   ADD PRODUCT
================================ */
window.addProduct = async function () {
  const name = document.getElementById("productName").value.trim();
  const category = document.getElementById("category").value;
  const price = document.getElementById("price").value;
  const imageUrl = document.getElementById("imageUrl").value.trim();

  if (!name || !category || !price) {
    alert("সব তথ্য পূরণ করুন");
    return;
  }

  try {
    await addDoc(collection(db, "products"), {
      name: name,
      category: category,
      price: Number(price),
      imageUrl: imageUrl || "",
      createdAt: serverTimestamp()
    });

    alert("✅ প্রোডাক্ট সফলভাবে যোগ হয়েছে");

    document.getElementById("productName").value = "";
    document.getElementById("price").value = "";
    document.getElementById("imageUrl").value = "";
    document.getElementById("category").value = "";

  } catch (error) {
    alert("❌ সমস্যা হয়েছে");
    console.error(error);
  }
};

/* ===============================
   LOAD ORDERS (REALTIME)
================================ */
const orderList = document.getElementById("orderList");

onSnapshot(collection(db, "orders"), (snapshot) => {
  orderList.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const o = docSnap.data();
    const id = docSnap.id;

    const div = document.createElement("div");
    div.className = "order";

    div.innerHTML = `
      <b>📦 ${o.productName}</b><br>
      দাম: ৳${o.price} <br>
      পরিমাণ: ${o.quantity} <br>
      মোবাইল: ${o.userPhone || "N/A"} <br>
      ঠিকানা: ${o.deliveryAddress || ""} <br>
      <span class="status">স্ট্যাটাস: ${o.status}</span><br><br>

      <select id="status-${id}">
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="delivering">Delivering</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <button onclick="updateOrderStatus('${id}')">
        স্ট্যাটাস আপডেট
      </button>
    `;

    orderList.appendChild(div);

    // default select value
    document.getElementById(`status-${id}`).value = o.status;
  });
});

/* ===============================
   UPDATE ORDER STATUS
================================ */
window.updateOrderStatus = async function (orderId) {
  const newStatus = document.getElementById(`status-${orderId}`).value;

  try {
    await updateDoc(doc(db, "orders", orderId), {
      status: newStatus
    });

    alert("✅ স্ট্যাটাস আপডেট হয়েছে");
  } catch (error) {
    alert("❌ আপডেট ব্যর্থ");
    console.error(error);
  }
};
