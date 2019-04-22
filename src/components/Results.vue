<template>
  <div class="results">
    <div class="stats">
      <div>{{ right }} / {{ total }}</div>
      <div>{{ (right / total) | percent }}</div>
    </div>
    <div
      class="result-line"
      v-bind:key="answer.questionIndex"
      v-for="answer in answers.answers"
    >
      <div
        v-bind:class="{
          correct: answer.correct,
          incorrect: !answer.correct
        }"
      >
        <div class="number">
          {{ answer.questionIndex }}
        </div>
        {{ questions[answer.questionIndex].question }}
        {{ answer.answer }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "results",
  filters: {
    percent: function(value) {
      const val = Number(value * 100);
      return `${(val &&
        val.toLocaleString(undefined, { maximumFractionDigits: 2 })) ||
        "0"}%`;
    }
  },
  computed: mapState({
    questions: state => state.questions,
    answers: state => state.answers,
    total: state => state.questions.length,
    right: state => {
      let total = 0;
      for (let a in state.answers.answers) {
        if (state.answers.answers[a].correct) total += 1;
      }
      return total;
    }
  })
};
</script>

<style>
.results {
  margin: 0 auto;
  max-width: 40%;
}
.result-line {
  padding: 20px 10px;
  border: 1px solid #e5e5e5;
  margin-bottom: 20px;
  border-radius: 10px;
  text-align: left;
}
.correct {
  color: green;
}
.incorrect {
  color: red;
}
.number {
  font-size: 30px;
  float: left;
  padding: 10px 30px 10px 20px;
}
</style>
