import firebase from "firebase/app";
import "firebase/auth";
import { ActionContext, Module } from 'vuex';

interface UserState {
  user: object
}
interface UserInfo {
  email: string,
  password: string
}

type UserContext = ActionContext<UserState, any>;

export default {
  state: {
    user: null
  },
  getters: {
    getUser: function(state: UserState) {
      return state.user;
    }
  },
  mutations: {
    SIGNIN: function(state: UserState, user: object) {
      state.user = user;
    }
  },
  actions: {
    loadUser: (context: UserContext) => {
      context.commit("SIGNIN", firebase.auth().currentUser);
    },
    login: (context: UserContext, userInfo: UserInfo) => {
      return firebase
        .auth()
        .signInWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(resp => {
          context.commit("SIGNIN", resp.user);
          return resp;
        });
    },
    signup: function(context: UserContext, userInfo: UserInfo) {
      firebase
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
