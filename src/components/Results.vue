<template>
  <div class="results">
    <div v-if="!test">
      No test specified
    </div>
    <div v-if="test">
      <section class="results-meta">
        Results for <em>{{ test.type | testName }}</em> taken on <em>{{ test.dateTaken | formatDate }}</em>
      </section>
      <section class="result-lines">
        <div
          class="result-line"
          v-bind:key="answer.questionIndex"
          v-for="answer in test.answers"
          v-bind:class="{
            correct: answer.correct,
            incorrect: !answer.correct
          }"
        >
          <div class="number">
            {{ answer.questionIndex + 1 }}
          </div>
          <span v-html="test.questions[answer.questionIndex].question">
            {{ test.questions[answer.questionIndex].question }}
          </span>
          
          <div class="answer-display" v-if="!answer.correct">
            <div
              v-bind:key="answerChoice"
              v-for="answerChoice in test.questions[answer.questionIndex].answer_choices"
              
              v-bind:class="{
                'correct-answer':
                  test.questions[answer.questionIndex].answer == answerChoice
              }"
            >
              {{ answerChoice }}
            </div>
          </div>
        </div>
      </section>
      <div class="stats">
        <div>{{ (right / total) | percent }}</div>
        <div>{{ right }} / {{ total }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "resultspart",
  props: ["test"],
  mounted() {},
  computed: mapState({
    total() {
      if (this.test.questions) return this.test.questions.length;
      return 0;
    },
    right() {
      let total = 0;
      if (!this.test) return 0;
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
  padding: 40px;
}
.results-meta {
  padding: 20px 20px 20px 0;
  font-weight: 500;
}
.results-meta em {
  font-weight: 800;
  font-size: 1.3em;
  color: rgba(37, 47, 61, 1.0)
}
.stats {
  width: 20%;
  float: left;
  margin-left: 40px;
  padding: 20px 10px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  background: #fff;
  line-height: 2;
  text-align: center;
  font-size: 1.4em;
  box-shadow: 0 0px 40px 0px rgba(37, 47, 61, 0.12);
}
.result-lines {
  width: 60%;
  float: left;
}
.result-line {
  padding: 20px 10px;
  border: 1px solid #e5e5e5;
  margin-bottom: 20px;
  border-radius: 10px;
  text-align: left;
  min-height: 50px;
}
.correct {
  background: lightgreen;
}
.incorrect {
  box-shadow: 0 0px 40px 0px rgba(37, 47, 61, 0.12);
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
  color: rgb(31, 167, 31);
  border: 1px solid rgb(31, 167, 31);
  border-radius: 4px;
  padding: 3px 8px;
  margin-left: -8px;
  font-weight: 500;
}
.incorrect-answer {
  color: red;
}
</style>
