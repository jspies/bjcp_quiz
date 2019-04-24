export default {
  state: {
    tests: []
  },
  getters: {
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
    STORE_TEST(_, test) {
      let tests = localStorage.getItem("tests");
      if (tests) {
        tests = JSON.parse(tests);
      } else {
        tests = [];
      }
      tests.push(test);
      localStorage.setItem("tests", JSON.stringify(tests));
    },
    INIT_TESTS(state) {
      const tests = localStorage.getItem("tests") || [];
      state.tests = JSON.parse(tests);
    }
  },
  actions: {
    initTests(context) {
      context.commit("INIT_TESTS");
    },
    storeTest(context, test) {
      test.dateTaken = new Date();
      context.commit("STORE_TEST", test);
    }
  }
};
