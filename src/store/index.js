import Vue from "vue";
import Vuex from "vuex";
import Answers from "@/store/modules/answers";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    answers: Answers
  },
  state: {
    currentQuestion: 0,
    questions: []
  },
  mutations: {
    LOAD_QUESTIONS(state, questions) {
      state.questions = questions;
    },
    INCREMENT_CURRENT_QUESTION(state) {
      state.currentQuestion = state.currentQuestion + 1;
    }
  },
  actions: {
    nextQuestion(context) {
      context.commit("INCREMENT_CURRENT_QUESTION");
    },
    fetchQuestions(context) {
      context.commit("LOAD_QUESTIONS", [
        {
          question:
            "A competition organizer may serve as the judge director and may also serve as a judge, provided this person has no knowledge of the association between entries and entrants.",
          answer: "true"
        },
        {
          question:
            "A competition’s judge director may serve as a judge, provided this person has no knowledge of the association between entries and entrants.",
          answer: "true"
        },
        {
          question:
            "A competition organizer may serve as the judge director, provided this person has no knowledge of the association between entries and entrants.",
          answer: "true"
        }
      ]);
    }
  }
});
