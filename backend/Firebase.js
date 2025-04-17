import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


 const firebaseConfig = process.env.NODE_ENV === 'production' ? {
  apiKey: "AIzaSyCNNu06BGaLzps6jVokGq8xrivbuWdFWBU",
  authDomain: "chainlink-96a71.firebaseapp.com",
  projectId: "chainlink-96a71",
  storageBucket: "chainlink-96a71.firebasestorage.app",
  messagingSenderId: "233296285883",
  appId: "1:233296285883:web:18932bd4c498305a25599e",
  measurementId: "G-MESL4JED6M"
 } : {
    apiKey: "AIzaSyCNNu06BGaLzps6jVokGq8xrivbuWdFWBU",
    authDomain: "chainlink-96a71.firebaseapp.com",
    projectId: "chainlink-96a71",
    storageBucket: "chainlink-96a71.firebasestorage.app",
    messagingSenderId: "233296285883",
    appId: "1:233296285883:web:18932bd4c498305a25599e",
    measurementId: "G-MESL4JED6M"
 }

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const storage = getStorage(app);
 export const database = getFirestore(app);
 export const analytics = () => getAnalytics(app)


 export default app