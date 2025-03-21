import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDRmBwLiLW8gV-GIl0LH489oyaRDutZ8rg",
    authDomain: "login-simples-aca21.firebaseapp.com",
    projectId: "login-simples-aca21",
    storageBucket: "login-simples-aca21.firebasestorage.app",
    messagingSenderId: "279822341155",
    appId: "1:279822341155:web:896d8c8d490fe27f0e4d96"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
