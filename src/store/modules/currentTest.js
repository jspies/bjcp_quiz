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

export default {
  state: {
    currentQuestion: 0,
    thinking: false,
    questions: [],
    answers: [],
    lastTest: {}
  },
  mutations: {
    SET_THINKING(state, value) {
      state.thinking = value;
    },
    STORE_LAST_TEST(state) {
      let test = {
        questions: state.questions,
        answers: state.answers,
        dateTaken: new Date()
      };
      state.lastTest = test;
      localStorage.setItem(LAST_TEST_KEY, JSON.stringify(test));
    },
    CLEAR_STATE(state) {
      state.currentQuestion = 0;
      state.answers = [];
      localStorage.setItem(CURRENT_QUESTION_KEY, 0);
      localStorage.setItem(ANSWERS_KEY, JSON.stringify(state.answers));
    },
    LOAD_QUESTIONS(state, questions) {
      state.questions = questions;
      localStorage.setItem("currentTest.questions", JSON.stringify(questions));
    },
    SET_CURRENT_QUESTION(state, num) {
      state.currentQuestion = num;
      localStorage.setItem(CURRENT_QUESTION_KEY, num);
    },
    INCREMENT_CURRENT_QUESTION(state) {
      state.currentQuestion = state.currentQuestion + 1;
      localStorage.setItem(CURRENT_QUESTION_KEY, state.currentQuestion);
    },
    RECORD_ANSWER: function(state, answer) {
      state.answers.push(answer);
      localStorage.setItem(ANSWERS_KEY, JSON.stringify(state.answers));
    },
    LOAD: function(state) {
      const currentQuestion = localStorage.getItem(CURRENT_QUESTION_KEY) || 0;
      if (typeof currentQuestion === "string") {
        state.currentQuestion = parseInt(currentQuestion);
      } else {
        state.currentQuestion = currentQuestion;
      }
      const questions = localStorage.getItem(QUESTIONS_KEY);
      if (questions) {
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
    }
  },
  actions: {
    initTest({ commit, state }) {
      commit("LOAD");
      // see if there was not a previous test in progress
      if (state.questions.length === 0) {
        commit("CLEAR_STATE");
        this.dispatch("fetchQuestions");
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
    fetchQuestions(context) {
      axios
        .get(
          "https://us-central1-bjcp-aae7d.cloudfunctions.net/random?number=3"
        )
        .then(function(result) {
          const questions = result.data.questions;
          context.commit("LOAD_QUESTIONS", questions);
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
          if (typeof accumulator === "object") {
            accumulator = 0;
          }
          if (a.correct) {
            accumulator += 1;
          }
          return accumulator;
        })
      };
      test.stats = stats;

      context.commit("STORE_LAST_TEST");
      context.commit("CLEAR_STATE");
      context.commit("LOAD_QUESTIONS", []);

      if (firebase.auth().currentUser) {
        test.userId = firebase.auth().currentUser.uid;
        test.type = "process_test";
        firebase
          .firestore()
          .collection("results")
          .add(test)
          .then(function(docRef) {
            console.log(docRef);
            // TODO: trigger saved
          });
      }
    }
  }
};
