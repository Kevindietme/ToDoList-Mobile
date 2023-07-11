import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDpHUq_OiwvYoRlLmTYCCPwQJ4DRNmPWwY",
    authDomain: "chekov-kd.firebaseapp.com",
    projectId: "chekov-kd",
    storageBucket: "chekov-kd.appspot.com",
    messagingSenderId: "579055671597",
    appId: "1:579055671597:web:d4f4e2b635bd4b0ffd1ba4"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);