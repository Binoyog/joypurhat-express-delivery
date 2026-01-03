<script type="module">
  /* ================= Firebase SDK ================= */
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
  import { getStorage } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

  /* ================= Firebase Config ================= */
  const firebaseConfig = {
    apiKey: "AIzaSyCiKuc8l-6RTZWf5FwUMEbUuMiMUUQ3lYM",
    authDomain: "joypurhat-express-delivery.firebaseapp.com",
    projectId: "joypurhat-express-delivery",
    storageBucket: "joypurhat-express-delivery.firebasestorage.app",
    messagingSenderId: "423594341774",
    appId: "1:423594341774:web:fd33f5a2d368e79e3e20df"
  };

  /* ================= Init ================= */
  const app = initializeApp(firebaseConfig);

  /* ================= Services ================= */
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  /* ================= Global Export ================= */
  window.auth = auth;
  window.db = db;
  window.storage = storage;
</script>
