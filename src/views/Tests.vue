<template>
  <div class="tests">
    <ul class="tests">
      <li v-for="(test, index) in tests" v-bind:key="test.dateToken">
        <router-link :to="{ name: 'results', params: { testId: index } }">
          <a>{{ test.dateTaken | formatDate }}</a>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "tests",
  computed: mapState({
    tests: state => state.tests.tests
  }),
  filters: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    }
  },
  mounted() {
    this.$store.dispatch("initTests");
  }
};
</script>

<style>
ul {
  list-style: none;
}
</style>
