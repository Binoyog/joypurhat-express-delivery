import { app } from "./firebase.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

/* 🔐 PUT YOUR ADMIN UID HERE */
const ADMIN_UID = "PUT_ADMIN_UID_HERE";

/* =========================
   AUTH GUARD
========================= */
onAuthStateChanged(auth, user => {
  if (!user || user.uid !== ADMIN_UID) {
    location.href = "login.html";
  }
});

/* =========================
   LOGOUT
========================= */
window.logout = () => {
  signOut(auth).then(() => {
    location.href = "login.html";
  });
};

/* =========================
   ADD PRODUCT
========================= */
window.addProduct = async () => {
  const name = productName.value.trim();
  const category = document.getElementById("category").value;
  const price = price.value;
  const image = imageUrl.value.trim();

  if (!name || !category || !price) {
    alert("সব তথ্য দিন");
    return;
  }

  await addDoc(collection(db, "products"), {
    name,
    category,
    price: Number(price),
    image,
    active: true,
    createdAt: serverTimestamp()
  });

  productName.value = price.value = imageUrl.value = "";
};

/* =========================
   LOAD PRODUCTS
========================= */
onSnapshot(collection(db, "products"), snap => {
  productList.innerHTML = "";
  snap.forEach(d => {
    const p = d.data();
    productList.innerHTML += `
      <div class="product">
        <img src="${p.image}">
        <b>${p.name}</b><br>
        ৳ <input type="number" value="${p.price}"
        onchange="updatePrice('${d.id}',this.value)">
        <button class="small-btn del-btn"
        onclick="deleteProduct('${d.id}')">Delete</button>
      </div>
    `;
  });
});

window.updatePrice = (id, val) =>
  updateDoc(doc(db, "products", id), { price: Number(val) });

window.deleteProduct = id => {
  if (confirm("ডিলিট করবেন?")) {
    deleteDoc(doc(db, "products", id));
  }
};

/* =========================
   LOAD ORDERS
========================= */
onSnapshot(collection(db, "orders"), snap => {
  orderList.innerHTML = "";
  snap.forEach(d => {
    const o = d.data();
    orderList.innerHTML += `
      <div class="order">
        <b>${o.productName}</b><br>
        ৳${o.price} | Qty: ${o.quantity}<br>
        📞 ${o.userPhone || ""}<br>
        Status:
        <select onchange="updateOrderStatus('${d.id}',this.value)">
          <option ${o.status=="pending"?"selected":""}>pending</option>
          <option ${o.status=="accepted"?"selected":""}>accepted</option>
          <option ${o.status=="delivering"?"selected":""}>delivering</option>
          <option ${o.status=="completed"?"selected":""}>completed</option>
          <option ${o.status=="cancelled"?"selected":""}>cancelled</option>
        </select>
      </div>
    `;
  });
});

window.updateOrderStatus = (id, status) =>
  updateDoc(doc(db, "orders", id), { status });
