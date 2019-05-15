import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const LAST_TEST_KEY = "currentTest.lastTest";

export default {
  state: {
    tests: [],
    lastTest: {}
  },
  getters: {
    lastLocalTest: state => {
      return state.lastTest;
    },
    latestTest: state => {
      return state.tests.sort(function(a, b) {
        return a.dateTaken > b.dateTaken;
      })[0];
    },
    sortedTests: state => {
      return state.tests.sort(function(a, b) {
        return a.dateTaken > b.dateTaken;
      });
    }
  },
  mutations: {
    LOAD_TESTS(state, tests) {
      state.tests = tests;
    },
    INIT_LAST_TEST(state) {
      const lastTest = localStorage.getItem(LAST_TEST_KEY);
      if (lastTest) {
        state.lastTest = JSON.parse(lastTest);
      }
    }
  },
  actions: {
    initTests(context) {
      context.commit("INIT_LAST_TEST");
      const tests = localStorage.getItem("tests");
      if (tests) {
        context.commit("LOAD_TESTS", JSON.parse(tests));
      }
      firebase.auth().onAuthStateChanged(() => {
        if (firebase.auth().currentUser) {
          firebase
            .firestore()
            .collection("results")
            .where("userId", "==", firebase.auth().currentUser.uid)
            .orderBy("dateTaken", "desc")
            .limit(50)
            .get()
            .then(function(result) {
              const newTests = result.docs.map(a => a.data());
              localStorage.setItem("tests", JSON.stringify(newTests));
              context.commit("LOAD_TESTS", newTests);
            });
        }
      });
    }
  }
};
