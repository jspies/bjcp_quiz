import Vue from "vue";
import Vuex from "vuex";
import CurrentTest from "@/store/modules/currentTest";
import Tests from "@/store/modules/tests";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    currentTest: CurrentTest,
    tests: Tests
  }
});
