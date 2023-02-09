import firebase from "firebase/app"; // 파이어베이스 기능 불러오기
import "firebase/firestore"; // 파이어베이스의 파이어스토어 기능 불러오기

const firebaseConfig = {
  apiKey: "AIzaSyC0MTsjfJfezN6SxERJ_ftDozVaeWDIrR4",
  authDomain: "my-todo1-a1fef.firebaseapp.com",
  projectId: "my-todo1-a1fef",
  storageBucket: "my-todo1-a1fef.appspot.com",
  messagingSenderId: "695007150343",
  appId: "1:695007150343:web:10876a61b8a6fa067d85a2",
};

export const db = firebase.initializeApp(firebaseConfig).firestore();
