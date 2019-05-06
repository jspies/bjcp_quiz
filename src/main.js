import Vue from "vue";
import router from "./router";
import firebase from "firebase/app";
import App from "./App.vue";
import store from "./store/";
import "./filters";
import "./registerServiceWorker";

const config = {
  apiKey: "AIzaSyAKDc2nMtmD41Av2h4GHM-zO11KkpTLrUs",
  authDomain: "bjcp-aae7d.firebaseapp.com",
  databaseURL: "https://bjcp-aae7d.firebaseio.com",
  projectId: "bjcp-aae7d",
  storageBucket: "bjcp-aae7d.appspot.com",
  messagingSenderId: "332778700779"
};
firebase.initializeApp(config);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
