export default {
  state: {
    answers: []
  },
  mutations: {
    RESET_ANSWERS: function(state) {
      state.answers = [];
      localStorage.setItem("answers", JSON.stringify(state.answers));
    },
    RECORD_ANSWER: function(state, answer) {
      state.answers.push(answer);
      localStorage.setItem("answers", JSON.stringify(state.answers));
    }
  },
  actions: {
    resetAnswers: function(context) {
      context.commit("RESET_ANSWERS");
    },
    recordAnswer: function(context, answer) {
      context.commit("RECORD_ANSWER", answer);
    }
  }
};
