<template>
  <div class="question-list">
    <div class="loading" v-if="questions.length <= 0">
      Loading
    </div>
    <section v-if="questions.length > 0">
      <div class="progress">
        {{ currentQuestion + 1 }} out of {{ questions.length }}
      </div>
      <section>
        <div v-if="questions[currentQuestion]">
          <div class="question">
            {{ questions[currentQuestion].question }}
          </div>
          <ul class="answer-choices">
            <li class="answer">
              <label for="questionAnswer1">
                <input
                  id="questionAnswer1"
                  name="questionAnswer"
                  type="radio"
                  value="true"
                  :disabled="questionChecked"
                  v-model="currentAnswer"
                />
                <span>True</span>
              </label>
            </li>
            <li class="answer">
              <label for="questionAnswer2">
                <input
                  id="questionAnswer2"
                  name="questionAnswer"
                  type="radio"
                  value="false"
                  :disabled="questionChecked"
                  v-model="currentAnswer"
                />
                <span>False</span>
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
import { mapState, mapActions } from "vuex";

export default {
  name: "tfquestionlist",
  data: function() {
    return {
      questionCorrect: null,
      currentAnswer: null,
      questionChecked: false
    };
  },
  computed: mapState({
    currentQuestion: state => state.currentTest.currentQuestion,
    questions: state => state.currentTest.questions,
    answers: state => state.currentTest.answers
  }),
  mounted() {
    document.addEventListener("keyup", this.keyListener);
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.keyListener);
  },
  methods: {
    keyListener(e) {
      switch (e.keyCode) {
        case 49: // 1
        case 116: // t
        case 84: // T
          this.currentAnswer = "true";
          break;
        case 50: // 2
        case 102: // f
        case 70: // F
          this.currentAnswer = "false";
          break;
        case 13:
          this.submitAction();
          break;
      }
    },
    ...mapActions(["recordAnswer"]),
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
            answers: this.answers
          });
          this.$router.push("/results");
        }
      }
    },
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
    },
    async submitAction() {
      if (this.currentAnswer != null && this.questionChecked === true) {
        this.nextQuestion();
      } else {
        this.checkQuestion();
      }
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
  width: 100%;
}
.progress {
  margin: 40px 0 20px 0;
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
.answer label {
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 10px 5px;
  display: inline-block;
}
.answer label span {
  margin: 0 20px;
}
</style>
