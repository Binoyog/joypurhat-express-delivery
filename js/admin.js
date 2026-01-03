import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const ordersDiv = document.getElementById("orders");

const q = query(collection(db, "orders"), orderBy("orderTime", "desc"));

onSnapshot(q, (snapshot) => {
  ordersDiv.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const o = docSnap.data();
    const id = docSnap.id;

    ordersDiv.innerHTML += `
      <div class="order">
        <p><b>Product:</b> ${o.productName}</p>
        <p><b>Price:</b> ৳${o.price}</p>
        <p><b>Qty:</b> ${o.quantity}</p>
        <p><b>Phone:</b> ${o.userPhone}</p>
        <p><b>Address:</b> ${o.deliveryAddress}</p>
        <p class="status ${o.status}">Status: ${o.status}</p>

        <select onchange="updateStatus('${id}', this.value)">
          <option value="">Change status</option>
          <option value="pending">Pending</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    `;
  });
});

window.updateStatus = async (id, status) => {
  if (!status) return;
  await updateDoc(doc(db, "orders", id), {
    status: status
  });
  alert("Status updated");
};
