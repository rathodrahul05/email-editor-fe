
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEo_U1x0KsNunINzYSsKVCX5sHB59YNAk",
  authDomain: "email-editor-social-login.firebaseapp.com",
  projectId: "email-editor-social-login",
  storageBucket: "email-editor-social-login.appspot.com",
  messagingSenderId: "191027899584",
  appId: "1:191027899584:web:f010ea2264149720a21125"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

