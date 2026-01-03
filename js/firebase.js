import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCiKuc8l-6RTZWf5FwUMEbUuMiMUUQ3lYM",
  authDomain: "joypurhat-express-delivery.firebaseapp.com",
  projectId: "joypurhat-express-delivery",
  storageBucket: "joypurhat-express-delivery.appspot.com",
  messagingSenderId: "423594341774",
  appId: "1:423594341774:web:fd33f5a2d368e79e3e20df"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
