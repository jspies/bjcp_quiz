<template>
  <div class="custom-quiz">
    <h2>Custom Quiz</h2>
    Which question types to include:
    <div class="option-row">
      <label class="check" for="process" v-bind:class="{chosen: includeProcess}">
        <input v-model="includeProcess" id="process" name="process" type="checkbox" class="check" />
        Process Questions
      </label>
      <label class="check" for="style" v-bind:class="{chosen: includeStyle}">
        <input v-model="includeStyle" id="style" name="style" type="checkbox" class="check" />
        Style Questions
      </label>
    </div>
    <div class="option-row">
      <label class="text">
        Number of Questions:
      </label>
      <input class="text" name="numQuestions" v-model="numQuestions" type="text" />
    </div>
    <div class="option-row">
      <button @click="go">Start</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class CustomQuiz extends Vue {
  name = "CustomQuiz";
  numQuestions = 10;
  includeStyle = true;
  includeProcess = true;

  mounted() {
    this.numQuestions = 10;
  }

  go() {
    this.$router.push({ name: "custom", params: {
      numQuestions: this.numQuestions,
      includeProcess: this.includeProcess,
      includeStyle: this.includeStyle
    }});
    this.$store.dispatch("toggleCustom");
  }
}
</script>

<style scoped>
.custom-quiz {
  display: block;
  width: 400px;
  z-index: 100;
  max-width: 400px;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
  padding: 20px;
}
input.text {
  margin: 0 0 0 20px;
  width: 90%;
  max-width: 100px;
  vertical-align: baseline;
  padding: 10px;
  border-radius: 5px;
  font-size: 1em;
  display: inline-block;
}
label.text {
  vertical-align: baseline;
  margin-top: 8px;
}
input.check {
  opacity: 0;
}
label.check {
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 10px 20px 10px 0px;
  display: inline-block;
  margin-right: 40px;
}
label.check:last-child {
  margin-right: 0;
}
label.chosen {
  border-color: #339cff;
  color: #339cff;
  background: #e3e6f7;
}
button {
  margin: 0 auto;
  
}
.option-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 20px 0;
}
</style>
