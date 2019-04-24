<template>
  <div class="question-list">
    <div class="question-view">
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
                v-model="currentAnswer"
              />
              <span>False</span>
            </label>
          </li>
        </ul>
      </div>
      <div v-if="!questions[currentQuestion]">
        <Results
          v-bind:test="{
            questions,
            answers,
            dateTaken: new Date()
          }"
        />
        <router-link to="/test" class="button-link">
          <a v-on:click="resetItAll">Practice Again</a>
        </router-link>
        |
        <router-link to="/" class="button-link">
          <a v-on:click="resetItAll">Home</a>
        </router-link>
      </div>
    </div>
    <section
      v-if="!questionChecked && questions[currentQuestion]"
      class="status-section neutral-status"
    >
      <button :disabled="currentAnswer == null" v-on:click="checkQuestion">
        Check
      </button>
    </section>
    <section
      v-if="questionCorrect === true && questions[currentQuestion]"
      class="status-section correct-status"
    >
      <button :disabled="currentAnswer == null" v-on:click="nextQuestion">
        Continue
      </button>
    </section>
    <section
      v-if="questionCorrect === false && questions[currentQuestion]"
      class="status-section incorrect-status"
    >
      <button :disabled="currentAnswer == null" v-on:click="nextQuestion">
        Continue
      </button>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Results from "@/components/Results.vue";

export default {
  name: "tfquestionlist",
  data: function() {
    return {
      questionCorrect: null,
      currentAnswer: null,
      questionChecked: false
    };
  },
  components: {
    Results
  },
  computed: mapState({
    currentQuestion: state => state.currentTest.currentQuestion,
    questions: state => state.currentTest.questions,
    answers: state => state.currentTest.answers
  }),
  mounted() {
    window.addEventListener("keypress", e => {
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
    });
  },
  methods: {
    ...mapActions(["recordAnswer", "newTest", "resetCurrentQuestion"]),
    resetItAll() {
      this.newTest();
      this.resetCurrentQuestion();
      this.questionCorrect = null;
      this.questionChecked = null;
      this.currentAnswer = null;
    },
    nextQuestion() {
      if (this.currentAnswer != null) {
        this.$store.dispatch("nextQuestion");
        this.questionCorrect = null;
        this.questionChecked = null;
        this.currentAnswer = null;

        if (this.currentQuestion >= this.questions.length) {
          this.$store.dispatch("storeTest", {
            questions: this.questions,
            answers: this.answers
          });
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
    submitAction() {
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
  max-height: 140px;
  position: fixed;
  bottom: 0;
  width: 100%;
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

.status-section button:disabled {
  color: #b5b5b5;
  background: #d5d5d5;
}

.correct-status {
  background: #b8f28b;
}
.correct-status button {
  background: #58a700;
}
.incorrect-status {
  background: #e47d8e;
}
.incorrect-status button {
  background: #e6202a;
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
