// // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// // import { getFirestore, collection, addDoc ,setDoc,doc} from "firebase/firestore";
// // import { getDatabase, ref, set} from "firebase/database";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCLZq_kDr_KS4TX95qaJE6p-VrF_ftOkos",
//   authDomain: "parking-app-672f2.firebaseapp.com",
//   projectId: "parking-app-672f2",
//   storageBucket: "parking-app-672f2.appspot.com",
//   messagingSenderId: "723378146671",
//   appId: "1:723378146671:web:b4cfed4e5971600a1fac9a",
//   measurementId: "G-20GMD0CD3T"
// };

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const auth = getAuth(app);
// // const db = getFirestore(app);
// // const database = getDatabase(app);
// // export {auth,db,database, createUserWithEmailAndPassword,collection, addDoc,setDoc ,doc}
// if (!firebase.apps.length){
//    let firebase = firebase.initializeApp(firebaseConfig);
// }
// firebase.firestore().settings({ experimentalForceLongPolling: true }); //add this..
// export {firebase};