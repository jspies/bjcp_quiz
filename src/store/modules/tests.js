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
    INIT_TESTS(state) {
      const lastTest = localStorage.getItem(LAST_TEST_KEY);
      if (lastTest) {
        state.lastTest = JSON.parse(lastTest);
      }
      const tests = localStorage.getItem("tests");
      if (tests) {
        state.tests = JSON.parse(tests);
      } else {
        state.tests = [];
      }
    }
  },
  actions: {
    initTests(context) {
      context.commit("INIT_TESTS");
    }
  }
};
