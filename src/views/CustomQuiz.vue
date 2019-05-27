<template>
  <div class="about">
    <TFQuestionList />
  </div>
</template>

<script>
import TFQuestionList from "@/components/TFQuestionList.vue";

export default {
  name: "process",
  components: {
    TFQuestionList
  },
  created() {
    this.$store.dispatch("initTest", {
      newTestType: "custom_test",
      numQuestions: this.$route.params.numQuestions || 10,
      includeProcess: this.$route.params.includeProcess,
      includeStyle: this.$route.params.includeStyle
    });
  }
};
</script>

<style>
.quiz-options {
  margin: 20px;
}
</style>
