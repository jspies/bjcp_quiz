<template>
  <div class="question-list">
    <div class="loading" v-if="questions.length <= 0">
      <img src="/img/icons/bigbeer.gif" />
    </div>
    <section v-if="questions.length > 0">
      <div class="progress">
        {{ currentQuestion + 1 }} out of {{ questions.length }}
      </div>
      <section>
        <div v-if="questions[currentQuestion]">
          <div class="question" v-html="questions[currentQuestion].question">
            {{ questions[currentQuestion].question }}
          </div>
          <ul class="answer-choices">
            <li
              class="answer"
              v-bind:key="answer"
              v-for="(answer, index) in questions[currentQuestion].answer_choices"
              v-bind:class="{chosen: answer == currentAnswer}"
            >
              <label :for="`questionAnswer${index}`">
                <input
                  class="answer-radio"
                  :id="`questionAnswer${index}`"
                  name="questionAnswer"
                  type="radio"
                  :value="answer"
                  :disabled="questionChecked"
                  v-model="currentAnswer"
                />
                <div class="number-choice">
                  {{ index + 1 }}
                </div>
                <span>{{ answer }}</span>
              </label>
            </li>
          </ul>
        </div>
      </section>
      <section
        v-if="questions[currentQuestion]"
        class="status-section"
        v-bind:class="{
          'neutral-status': !questionChecked && questions[currentQuestion],
          'correct-status':
            questionCorrect === true && questions[currentQuestion],
          'incorrect-status':
            questionChecked && !questionCorrect && questions[currentQuestion]
        }"
      >
        <div class="content">
          <div class="answer-message">
            <span v-if="questionChecked && questionCorrect">
              Correct
            </span>
            <div
              class="answer-message-incorrect"
              v-if="questionChecked && !questionCorrect"
            >
              Incorrect
              <div>Answer is: {{ questions[currentQuestion].answer }}</div>
            </div>
          </div>
          <button
            v-if="!questionChecked"
            class="next-button check-button"
            :disabled="currentAnswer == null"
            v-on:click="submitAction"
          >
            Check
          </button>
          <button
            v-if="questionChecked"
            class="next-button"
            :disabled="currentAnswer == null"
            v-on:click="submitAction"
          >
            Continue
          </button>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

@Component({
  methods: {
    ...mapActions(["recordAnswer"])
  },
  computed: mapState({
    currentQuestion: state => state.currentTest.currentQuestion,
    questions: state => state.currentTest.questions,
    answers: state => state.currentTest.answers,
    type: state => state.currentTest.type
  })
})
export default class TFQuestionList extends Vue {
  name = "tfquestionlist";

  data() {
    return {
      questionCorrect: null,
      currentAnswer: null,
      questionChecked: false
    };
  }

  mounted() {
    document.addEventListener("keyup", this.keyListener);
  }

  beforeDestroy() {
    document.removeEventListener("keyup", this.keyListener);
  }

  keyListener(e) {
    switch (e.keyCode) {
      case 49: // 1
        this.currentAnswer = this.questions[this.currentQuestion].answer_choices[0];
        break;
      case 116: // t
      case 84: // T
        this.currentAnswer = this.questions[this.currentQuestion].answer_choices[0];
        break;
      case 50: // 2
      case 102: // f
      case 70: // F
        this.currentAnswer = this.questions[this.currentQuestion].answer_choices[1];
        break;
      case 51:
        this.currentAnswer = this.questions[this.currentQuestion].answer_choices[2];
        break;
      case 52:
        this.currentAnswer = this.questions[this.currentQuestion].answer_choices[3];
        break;
      case 13:
        this.submitAction();
        break;
    }
  }

  nextQuestion() {
    if (this.currentAnswer != null) {
      this.$store.dispatch("nextQuestion");
      this.questionCorrect = null;
      this.questionChecked = null;
      this.currentAnswer = null;

      // end of test
      if (this.currentQuestion >= this.questions.length) {
        this.$store.dispatch("storeTest", {
          questions: this.questions,
          answers: this.answers,
          type: this.type
        });
        this.$router.push("/results");
      }
    }
  }

  checkQuestion() {
    if (this.currentAnswer != null && !this.questionChecked) {
      this.questionChecked = true;

      if (this.questions[this.currentQuestion].answer == this.currentAnswer) {
        this.questionCorrect = true;
      } else {
        this.questionCorrect = false;
      }
      this.recordAnswer({
        correct: this.questionCorrect,
        questionIndex: this.currentQuestion,
        answer: this.currentAnswer
      });
    }
  }

  async submitAction() {
    if (this.currentAnswer != null && this.questionChecked === true) {
      this.nextQuestion();
    } else {
      this.checkQuestion();
    }
  }
  
};
</script>

<style>
.status-section {
  border-top: 1px solid #e5e5e5;
  padding: 40px 5px;
  overflow: hidden;
  background: #fff;
  margin: 0;
  height: 80px;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 256px;
}
.progress {
  margin: 40px 0 20px 0;
}
.loading {
  margin-top: 200px;
}
.status-section button {
  display: inline-block;
  line-height: 20px;
  vertical-align: middle;
  border-radius: 16px;
  padding: 13px 16px;
  text-transform: uppercase;
  font-size: 1.1em;
  background: #58a700;
  color: #fff;
  border: 0;
  font-weight: 500;
}
.status-section .content {
  max-width: 800px;
  margin: 0 auto;
}
.status-section .answer-message {
  font-size: 2em;
  float: left;
  text-align: left;
  margin-left: 80px;
}
.status-section .answer-message-incorrect {
  position: relative;
}
.status-section div.answer-message-incorrect div {
  position: relative;
  top: -10px;
  font-size: 0.8em;
}
.status-section button:disabled {
  color: #b5b5b5;
  background: #d5d5d5;
}
.next-button {
  float: right;
  margin-right: 80px;
}
.correct-status {
  background: #b8f28b;
  color: #489700;
}
.correct-status button {
  background: #58a700;
}
.incorrect-status {
  background: #e47d8e;
  color: #a6101a;
}
.incorrect-status button {
  background: #e6202a;
}
.question {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
}
.question-list {
  text-align: center;
}
ul.answer-choices {
  list-style: none;
}
ul.answer-choices li {
  display: inline-block;
  margin: 20px;
}
ul.answer-choices li.answer.chosen .number-choice {
  border-color: #339cff;
  background: #93cbff;
}
li.answer label {
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 10px 5px;
  display: inline-block;
  text-transform: capitalize;
}
li.answer.chosen label {
  border-color: #339cff;
}
li.answer label span {
  margin: 0 20px;
  vertical-align: baseline;
  line-height: 1.8;
}
.answer-radio {
  opacity: 0;
}
ul.answer-choices li.answer .number-choice {
  float: left;
  border: 1px solid #e5e5e5;
  border-radius: 2px;
  padding: 3px 8px 2px 8px;
  margin-left: 5px;
  vertical-align: baseline;
}
@media only screen and (max-width: 600px) {
  .status-section {
    left: 0;
  }
}
</style>
