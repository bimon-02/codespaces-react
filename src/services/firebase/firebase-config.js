import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAfewqW_5zQQoPo9_lCHRIe02nMzVvngAA",
  authDomain: "authentication-48ad7.firebaseapp.com",
  projectId: "authentication-48ad7",
  storageBucket: "authentication-48ad7.appspot.com",
  messagingSenderId: "162619046427",
  appId: "1:162619046427:web:0f349fadfeb9d3e03596be",
  measurementId: "G-JZP17K349R",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);