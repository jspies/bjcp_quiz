<template>
  <div class="results-page">
    <Results v-bind:test="tests.tests[$route.params.testId]" />
    <router-link :to="{ name: 'tests' }">
      <a>Back to Tests</a>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Results from "@/components/Results";

export default {
  name: "results-page",
  components: { Results },
  computed: {
    ...mapState(["tests"]),
    ...mapGetters(["latestTest"])
  },
  mounted() {
    this.$store.dispatch("initTests");
  }
};
</script>
