import { auth, db } from "./firebase.js";
import {
  collection, addDoc, onSnapshot,
  updateDoc, doc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const ADMIN_UID = "PUT_ADMIN_UID_HERE";

/* 🔒 PROTECT ADMIN */
onAuthStateChanged(auth,user=>{
  if(!user || user.uid !== ADMIN_UID){
    location.href="admin-login.html";
  }
});

/* ADD PRODUCT */
window.addProduct = async ()=>{
  if(!productName.value || !category.value || !price.value){
    alert("সব তথ্য দিন");
    return;
  }

  await addDoc(collection(db,"products"),{
    name:productName.value,
    category:category.value,
    price:Number(price.value),
    createdAt:serverTimestamp()
  });

  productName.value=price.value="";
};

/* LOAD ORDERS */
onSnapshot(collection(db,"orders"),snap=>{
  orderList.innerHTML="";
  snap.forEach(d=>{
    const o=d.data();
    orderList.innerHTML+=`
      <div class="order">
        <b>${o.productName}</b><br>
        ৳${o.price}<br>
        Status: ${o.status}
        <select onchange="updateStatus('${d.id}',this.value)">
          <option>pending</option>
          <option>accepted</option>
          <option>completed</option>
        </select>
      </div>
    `;
  });
});

window.updateStatus = async(id,status)=>{
  await updateDoc(doc(db,"orders",id),{status});
};
