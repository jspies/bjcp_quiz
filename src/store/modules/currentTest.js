const QUESTIONS = [
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
  },
  {
    question:
      "A competition’s judge director may not serve as a judge, even if this person has no knowledge of the association between entries and entrants.",
    answer: "false"
  },
  {
    question:
      "A competition organizer may not serve as a judge, even if this person has no knowledge of the association between entries and entrants.",
    answer: "false"
  },
  {
    question:
      "A competition’s judge director may serve as the competition organizer and may also serve as a judge, provided this person has no knowledge of the association between entries and entrants.",
    answer: "true"
  }
];

export default {
  state: {
    currentQuestion: 0,
    questions: [],
    answers: []
  },
  mutations: {
    CLEAR_STATE(state) {
      state.currentQuestion = 0;
      state.answers = [];
    },
    LOAD_QUESTIONS(state, questions) {
      state.questions = questions;
    },
    INCREMENT_CURRENT_QUESTION(state) {
      state.currentQuestion = state.currentQuestion + 1;
    },
    RESET_CURRENT_QUESTION(state) {
      state.currentQuestion = 0;
    },
    RECORD_ANSWER: function(state, answer) {
      state.answers.push(answer);
    }
  },
  actions: {
    newTest(context) {
      context.commit("LOAD_QUESTIONS", QUESTIONS);
      context.commit("CLEAR_STATE");
    },
    nextQuestion(context) {
      context.commit("INCREMENT_CURRENT_QUESTION");
    },
    resetCurrentQuestion(context) {
      context.commit("RESET_CURRENT_QUESTION");
    },
    recordAnswer: function(context, answer) {
      context.commit("RECORD_ANSWER", answer);
    },
    fetchQuestions(context) {
      context.commit("LOAD_QUESTIONS", QUESTIONS);
    }
  }
};
