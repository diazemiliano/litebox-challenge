// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY || "",
  authDomain: "striped-bastion-354012.firebaseapp.com",
  projectId: "striped-bastion-354012",
  storageBucket: "striped-bastion-354012.appspot.com",
  messagingSenderId: "712725761829",
  appId: "1:712725761829:web:22932c00f23f3840fe14cc",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseStore = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);
const ApiConstructor = {
  store: {
    firebaseStore,
    db,
    collection,
    getDocs,
    addDoc,
  },
  storage: {
    firebaseStorage,
    ref,
    uploadBytes,
    uploadBytesResumable,
    getDownloadURL,
  },
};

const ApiResponseHandler = ({ instance }) => {
  return instance;
};

export { ApiConstructor, ApiResponseHandler };
