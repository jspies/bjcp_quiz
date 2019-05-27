import Vue from "vue";
import Vuex from "vuex";
import "firebase/firestore";

import CurrentTest from "@/store/modules/currentTest";
import Tests from "@/store/modules/tests";
import User from "@/store/modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    currentTest: CurrentTest,
    tests: Tests,
    user: User
  },
  state: {
    showingLogin: false,
    showingSignup: false,
    showingCustom: false
  },
  mutations: {
    TOGGLE_SIGNUP(state) {
      state.showingSignup = !state.showingSignup;
      if (state.showingSignup) {
        state.showingLogin = false;
      }
    },
    TOGGLE_LOGIN(state) {
      state.showingLogin = !state.showingLogin;
      if (state.showingLogin) {
        state.showingSignup = false;
      }
    },
    TOGGLE_CUSTOM(state) {
      state.showingCustom = !state.showingCustom;
    }
  },
  actions: {
    toggleLogin(context) {
      context.commit("TOGGLE_LOGIN");
    },
    toggleSignup(context) {
      context.commit("TOGGLE_SIGNUP");
    },
    toggleCustom(context) {
      context.commit("TOGGLE_CUSTOM");
    }
  }
});
