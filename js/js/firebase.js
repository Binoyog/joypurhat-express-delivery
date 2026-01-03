<script type="module">
  /* ================= Firebase SDK Imports ================= */
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
  import { getStorage } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

  /* ================= Your Firebase Config ================= */
  const firebaseConfig = {
    apiKey: "AIzaSyCiKuc8l-6RTZWf5FwUMEbUuMiMUUQ3lYM",
    authDomain: "joypurhat-express-delivery.firebaseapp.com",
    projectId: "joypurhat-express-delivery",
    storageBucket: "joypurhat-express-delivery.firebasestorage.app",
    messagingSenderId: "423594341774",
    appId: "1:423594341774:web:fd33f5a2d368e79e3e20df"
  };

  /* ================= Initialize Firebase ================= */
  const app = initializeApp(firebaseConfig);

  /* ================= Firebase Services ================= */
  const auth = getAuth(app);          // Login / Admin auth
  const db = getFirestore(app);       // Firestore (orders, users, products)
  const storage = getStorage(app);    // Product image upload

  /* ================= Export to Global ================= */
  window.firebaseApp = app;
  window.auth = auth;
  window.db = db;
  window.storage = storage;
</script>
