import firebase from "firebase/app";
import "firebase/auth";

export default {
  state: {
    user: null
  },
  getters: {
    getUser: function(state) {
      return state.user;
    }
  },
  mutations: {
    SIGNIN: function(state, user) {
      state.user = user;
    }
  },
  actions: {
    loadUser: context => {
      context.commit("SIGNIN", firebase.auth().currentUser);
    },
    login: (context, userInfo) => {
      return firebase
        .auth()
        .signInWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(resp => {
          context.commit("SIGNIN", resp.user);
          return resp;
        });
    },
    signup: (context, userInfo) => {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(() => {
          return this.$store.dispatch("login", {
            email: userInfo.email,
            password: userInfo.password
          });
        })
        .catch(err => {
          alert(err.message);
        });
    }
  }
};
