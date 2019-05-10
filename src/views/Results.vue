<template>
  <div class="results-page">
    <Results v-bind:test="lastLocalTest" v-if="!$route.params.testId" />
    <div v-if="$route.params.testId">
      <Results v-bind:test="tests.tests[$route.params.testId]" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Results from "@/components/Results";

export default {
  name: "results-page",
  components: { Results },
  computed: {
    ...mapState(["tests", "lastTest"]),
    ...mapGetters(["latestTest", "lastLocalTest"])
  },
  created() {
    this.$store.dispatch("initTests");
  }
};
</script>
