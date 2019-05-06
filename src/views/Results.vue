<template>
  <div class="results-page">
    <Results v-bind:test="lastLocalTest" />
    <div v-if="$route.params.testId">
      <Results v-bind:test="tests.tests[$route.params.testId]" />

      <router-link :to="{ name: 'tests' }">
        <a>Back to Tests</a>
      </router-link>
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
