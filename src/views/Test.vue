<template>
  <div class="about">
    <h1>Process Test</h1>

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
    this.$store.dispatch("fetchQuestions");
  }
};
</script>
