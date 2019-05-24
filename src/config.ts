import firebase from "firebase/app";
import "firebase/auth";
import store from "./store";

const config = {
  apiKey: "AIzaSyAKDc2nMtmD41Av2h4GHM-zO11KkpTLrUs",
  authDomain: "bjcp-aae7d.firebaseapp.com",
  databaseURL: "https://bjcp-aae7d.firebaseio.com",
  projectId: "bjcp-aae7d",
  storageBucket: "bjcp-aae7d.appspot.com",
  messagingSenderId: "332778700779"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
  store.commit("SIGNIN", user);
});
