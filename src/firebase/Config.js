import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLHPSc1eInJkFc2eS22eXFofmM0yPmAJY",
  authDomain: "groupchatapp-3449f.firebaseapp.com",
  projectId: "groupchatapp-3449f",
  storageBucket: "groupchatapp-3449f.appspot.com",
  messagingSenderId: "126016525467",
  appId: "1:126016525467:web:abbe761d7bdbcc4ee1223e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
