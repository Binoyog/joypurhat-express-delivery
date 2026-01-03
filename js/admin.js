<script type="module">
  import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
  } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

  import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    query,
    orderBy,
    serverTimestamp
  } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

  import {
    ref,
    uploadBytes,
    getDownloadURL
  } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

  /* ================= ADMIN LOGIN ================= */
  window.adminLogin = async function () {
    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Admin Login Successful");
      window.location.href = "admin-dashboard.html";
    } catch (err) {
      alert(err.message);
    }
  };

  /* ================= AUTH PROTECT ================= */
  onAuthStateChanged(auth, (user) => {
    if (!user && location.pathname.includes("admin-dashboard")) {
      window.location.href = "admin-login.html";
    }
  });

  /* ================= LOGOUT ================= */
  window.adminLogout = async function () {
    await signOut(auth);
    window.location.href = "admin-login.html";
  };

  /* ================= ADD PRODUCT ================= */
  window.addProduct = async function () {
    const name = document.getElementById("productName").value;
    const price = Number(document.getElementById("productPrice").value);
    const imageFile = document.getElementById("productImage").files[0];

    if (!name || !price || !imageFile) {
      alert("সব ফিল্ড পূরণ করো");
      return;
    }

    try {
      const imgRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imgRef, imageFile);
      const imageUrl = await getDownloadURL(imgRef);

      await addDoc(collection(db, "products"), {
        name,
        price,
        imageUrl,
        createdAt: serverTimestamp()
      });

      alert("Product Added Successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  /* ================= LOAD ORDERS ================= */
  window.loadOrders = async function () {
    const orderBox = document.getElementById("ordersList");
    orderBox.innerHTML = "";

    const q = query(collection(db, "orders"), orderBy("orderTime", "desc"));
    const snap = await getDocs(q);

    snap.forEach((docSnap) => {
      const o = docSnap.data();

      orderBox.innerHTML += `
        <div style="border:1px solid #ccc;padding:10px;margin:10px 0">
          <b>${o.productName}</b><br>
          Price: ${o.price} ৳<br>
          Qty: ${o.quantity}<br>
          Phone: ${o.userPhone}<br>
          Address: ${o.deliveryAddress}<br>
          Payment: ${o.paymentMethod}<br>
          Status:
          <select onchange="updateOrderStatus('${docSnap.id}', this.value)">
            <option ${o.status === "pending" ? "selected" : ""}>pending</option>
            <option ${o.status === "delivered" ? "selected" : ""}>delivered</option>
            <option ${o.status === "cancelled" ? "selected" : ""}>cancelled</option>
          </select>
        </div>
      `;
    });
  };

  /* ================= UPDATE ORDER STATUS ================= */
  window.updateOrderStatus = async function (orderId, status) {
    await updateDoc(doc(db, "orders", orderId), { status });
    alert("Order status updated");
  };
</script>
