// Import the functions you need from the SDKs you need
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfOxQTzt0t0ek2Wo8Zu3rL8YE8sr2D-Sw",
  authDomain: "deploy-movie-website.firebaseapp.com",
  databaseURL:
    "https://deploy-movie-website-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "deploy-movie-website",
  storageBucket: "deploy-movie-website.appspot.com",
  messagingSenderId: "78119597849",
  appId: "1:78119597849:web:df0bf7474fee46f22b3788",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
