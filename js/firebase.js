// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, RecaptchaVerifier } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCiKuc8l-6RTZWf5FwUMEbUuMiMUUQ3lYM",
  authDomain: "joypurhat-express-delivery.firebaseapp.com",
  projectId: "joypurhat-express-delivery",
  storageBucket: "joypurhat-express-delivery.firebasestorage.app",
  messagingSenderId: "423594341774",
  appId: "1:423594341774:web:fd33f5a2d368e79e3e20df"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export function setupRecaptcha(containerId) {
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    containerId,
    { size: "invisible" }
  );
}
