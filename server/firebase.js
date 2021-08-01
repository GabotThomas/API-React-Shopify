import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';



var firebaseConfig = {
    apiKey: "AIzaSyC-2MXulrlinBkK3TK3osLbEFi9CgoTS5k",
    authDomain: "let-s-train.firebaseapp.com",
    projectId: "let-s-train",
    storageBucket: "let-s-train.appspot.com",
    messagingSenderId: "500240957667",
    appId: "1:500240957667:web:7ae5125f33d0b97f8745d6"
  };
    
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        
    }else {
        firebase.app();
         // if already initialized, use that one
    }


    const db = firebase.firestore()


    export const TacheLoad = (collection, observer) => {

        return db
        .collection('product')
        .doc(collection)
        .collection('inclus')
        .onSnapshot(observer);
    };


    export const addTache = (collection,value) => {
        return db
        .collection('product')
        .doc(collection)
        .collection('inclus')
        .add({
            Tache: value,
        })
    };
    export const DeleteTache = (collection,id) => {
        return db
        .collection('product')
        .doc(collection)
        .collection('inclus')
        .doc(id)
        .delete()
    };

    //Petite description
    export const LDesc = (collection,value) => {
        return db
        .collection('product')
        .doc(collection)
        .update({
            LDesc: value,
        })
    };
    export const LDescLoad = async (collection) => {
        
        const response = await firebase.auth().signInWithEmailAndPassword("LestrainParis.Database@gmail.com", "LetstrainParis1&34%")
           
        return db
        .collection('product')
        .doc(collection)
        .get()      

    };








export default firebase;