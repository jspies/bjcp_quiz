<template>
  <div class="results">
    <div class="stats">
      <div>{{ right }} / {{ total }}</div>
      <div>{{ (right / total) | percent }}</div>
    </div>
    <div
      class="result-line"
      v-bind:key="answer.questionIndex"
      v-for="answer in test.answers"
      v-bind:class="{
        correct: answer.correct,
        incorrect: !answer.correct
      }"
    >
      <div>
        <div class="number">
          {{ answer.questionIndex + 1 }}
        </div>
        {{ test.questions[answer.questionIndex].question }}
        <div class="answer-display" v-if="!answer.correct">
          <div
            v-bind:class="{
              'correct-answer':
                test.questions[answer.questionIndex].answer == 'true'
            }"
          >
            True
          </div>
          <div
            v-bind:class="{
              'correct-answer':
                test.questions[answer.questionIndex].answer == 'false'
            }"
          >
            <span class="lefted" v-if="answer.answer == 'false'">
              -->
            </span>
            False
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "resultspart",
  props: ["test"],
  filters: {
    percent: function(value) {
      const val = Number(value * 100);
      return `${(val &&
        val.toLocaleString(undefined, { maximumFractionDigits: 2 })) ||
        "0"}%`;
    }
  },
  mounted() {},
  computed: mapState({
    total() {
      return this.test.questions.length;
    },
    right() {
      let total = 0;
      for (let a in this.test.answers) {
        if (this.test.answers[a].correct) total += 1;
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
.stats {
  margin-bottom: 40px;
}
.result-line {
  padding: 20px 10px;
  border: 1px solid #e5e5e5;
  margin-bottom: 20px;
  border-radius: 10px;
  text-align: left;
}
.correct {
  background: lightgreen;
}
.correct .number {
  color: green;
}
.incorrect .number {
  color: red;
}
.number {
  font-size: 30px;
  float: left;
  padding: 10px 30px 10px 20px;
}
.answer-display {
  width: 30%;

  margin: 10px auto;
}
.correct-answer {
  color: green;
}
.incorrect-answer {
  color: red;
}
.lefted {
  display: inline-block;
  margin-left: -25px;
}
</style>
