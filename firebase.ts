// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM9o7Va8ld82JDQodwcLL_jEgOhWld9Wk",
  authDomain: "tradeverse-bcef3.firebaseapp.com",
  projectId: "tradeverse-bcef3",
  storageBucket: "tradeverse-bcef3.appspot.com",
  messagingSenderId: "268440461307",
  appId: "1:268440461307:web:01890f3cee5141b982355e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



export const signUp = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      toast.success("Account Created Sucessfully", {
        position: "bottom-right"
      });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode);
      toast.error(errorMessage, {
        position: "bottom-right"
      });
    });
};

export const signIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    toast.success("Account Created Sucessfully", {
      position: "bottom-right"
    });
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    toast.error(errorMessage, {
      position: "bottom-right"
    });
  });
}
