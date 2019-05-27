import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

/**
 * currentTest is essentially a model for taking a test.
 * The test is stored in localStorage so that it can be resumed.
 * It is never stored remotely. That happens on test completion when it becomes a testResult.
 * Questions
 * Answers
 * currentQuestion
 */

const CURRENT_QUESTION_KEY = "currentTest.currentQuestion";
const ANSWERS_KEY = "currentTest.answers";
const QUESTIONS_KEY = "currentTest.questions";
const LAST_TEST_KEY = "currentTest.lastTest";

interface CurrentTestState {
  currentQuestion: number,
  thinking: boolean,
  questions: Array<object>,
  answers: Array<object>,
  lastTest: object,
  type: string
}

interface TestOptions {
  numQuestions: number,
  newTestType: string,
  includeProcess: boolean,
  includeStyle: boolean
}

export default {
  state: {
    currentQuestion: 0,
    thinking: false,
    questions: [],
    answers: [],
    lastTest: {},
    type: ""
  },
  mutations: {
    SET_THINKING(state: CurrentTestState, value: boolean) {
      state.thinking = value;
    },
    STORE_LAST_TEST(state: CurrentTestState) {
      let test = {
        questions: state.questions,
        answers: state.answers,
        dateTaken: new Date(),
        type: state.type
      };
      state.lastTest = test;
      localStorage.setItem(LAST_TEST_KEY, JSON.stringify(state.lastTest));
    },
    CLEAR_STATE(state: CurrentTestState) {
      state.currentQuestion = 0;
      state.answers = [];
      state.type = "";
      localStorage.setItem(CURRENT_QUESTION_KEY, JSON.stringify(0));
      localStorage.setItem(ANSWERS_KEY, JSON.stringify(state.answers));
    },
    LOAD_QUESTIONS(state: CurrentTestState, questions: Array<object>) {
      state.questions = questions;
      localStorage.setItem("currentTest.questions", JSON.stringify(questions));
    },
    SET_CURRENT_QUESTION(state: CurrentTestState, num: number) {
      state.currentQuestion = num;
      localStorage.setItem(CURRENT_QUESTION_KEY, JSON.stringify(num));
    },
    INCREMENT_CURRENT_QUESTION(state: CurrentTestState) {
      state.currentQuestion = state.currentQuestion + 1;
      localStorage.setItem(CURRENT_QUESTION_KEY, JSON.stringify(state.currentQuestion));
    },
    RECORD_ANSWER: function(state: CurrentTestState, answer: object) {
      state.answers.push(answer);
      localStorage.setItem(ANSWERS_KEY, JSON.stringify(state.answers));
    },
    LOAD: function(state: CurrentTestState) {
      const currentQuestion = localStorage.getItem(CURRENT_QUESTION_KEY) || 0;
      if (typeof currentQuestion === "string") {
        state.currentQuestion = parseInt(currentQuestion);
      } else {
        state.currentQuestion = currentQuestion;
      }
      const questions = localStorage.getItem(QUESTIONS_KEY);
      if (questions && Array.isArray(questions)) {
        state.questions = JSON.parse(questions);
      } else {
        state.questions = [];
      }
      const answers = localStorage.getItem(ANSWERS_KEY);
      if (answers) {
        state.answers = JSON.parse(answers);
      } else {
        state.answers = [];
      }
    },
    SET_TYPE: function(state: CurrentTestState, type: string) {
      state.type = type;
    }
  },
  actions: {
    initTest({ commit, state }, options: TestOptions) {
      commit("LOAD");
      // see if there was not a previous test in progress
      if (!state.questions || state.questions.length === 0) {
        commit("CLEAR_STATE");
        this.dispatch("fetchQuestions", options);
        commit("SET_TYPE", options.newTestType);
      } else {
        // resume previous test, need to set current question to sync with actual results
        commit("SET_CURRENT_QUESTION", state.answers.length);
      }
    },
    nextQuestion(context) {
      context.commit("INCREMENT_CURRENT_QUESTION");
    },
    recordAnswer: function(context, answer) {
      context.commit("RECORD_ANSWER", answer);
    },
    fetchQuestions(context, options: TestOptions) {

      function shuffleArray(array: Array<any>) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

      let url;
      let promises = [];
      switch(options.newTestType) {
        case "style_test":
          url = `https://us-central1-bjcp-aae7d.cloudfunctions.net/dynamicQuestion?number=${options.numQuestions}`;
          promises.push(axios.get(url));
          break;
        case "process_test":
          url = `https://us-central1-bjcp-aae7d.cloudfunctions.net/random?number=${options.numQuestions}`;
          promises.push(axios.get(url));
          break;
        default:

          let diff;
          if (options.includeProcess && options.includeStyle) {
            diff = Math.floor(options.numQuestions / 2);
          } else {
            if (options.includeProcess) {
              diff = 0;
            } else {
              diff = options.numQuestions;
            }
          }

          if (options.includeStyle) {
            url = `https://us-central1-bjcp-aae7d.cloudfunctions.net/dynamicQuestion?number=${diff}`;
            promises.push(axios.get(url));
          }
          if (options.includeProcess) {
            url = `https://us-central1-bjcp-aae7d.cloudfunctions.net/random?number=${options.numQuestions - diff}`;
            promises.push(axios.get(url));
          }
      }
      Promise
        .all(promises)
        .then(function(results) {
          let questions = [];
          results.map(r => {
            questions = questions.concat(r.data.questions);
          });
          shuffleArray(questions);
          context.commit("LOAD_QUESTIONS", questions);
        })
      axios
        .get(
          url
        )
        .then(function(result) {
          
          
        });
    },
    thinking(context) {
      return context.commit("SET_THINKING", true);
    },
    doneThinking(context) {
      context.commit("SET_THINKING", false);
    },
    storeTest(context, test) {
      test.dateTaken = new Date();

      let stats = {
        total: test.questions.length,
        correct: test.answers.reduce((accumulator, a) => {
          if (a.correct) {
            return accumulator + 1;
          }
          return accumulator;
        }, 0)
      };
      test.stats = stats;

      context.commit("STORE_LAST_TEST");
      context.commit("CLEAR_STATE");
      context.commit("LOAD_QUESTIONS", []);

      if (firebase.auth().currentUser) {
        test.userId = firebase.auth().currentUser.uid;
        firebase
          .firestore()
          .collection("results")
          .add(test)
          .then(function(docRef) {
            // TODO: trigger saved
          });
      }
    }
  }
};
