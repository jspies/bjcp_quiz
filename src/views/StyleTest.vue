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
    this.$store.dispatch("initTest", "style_test");
  }
};
</script>
