<template>
  <div class="tests">
    <ul v-if="user" class="tests">
      <li v-for="(test, index) in tests" v-bind:key="test.dateToken">
        <router-link
          class="row-cell"
          :to="{ name: 'results', params: { testId: index } }"
        >
          <a>{{ test.dateTaken | formatDate }}</a>
        </router-link>
        <span class="row-cell">
          {{ test.stats.correct }} / {{ test.stats.total }}
        </span>
        <span class="row-cell">{{
          (test.stats.correct / test.stats.total) | percent
        }}</span>
      </li>
    </ul>
    <div class="empty" v-if="!user">
      Viewing your past tests is only available when you are logged in.
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "tests",
  computed: mapState({
    tests: state => state.tests.tests,
    user: function() {
      return this.$store.getters.getUser;
    }
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
ul.tests {
  max-width: 40%;
  list-style: none;
  margin: 0 auto;
}
ul.tests li {
  padding: 20px;
  border: 1px solid #e5e5e5;
  margin-bottom: 40px;
}
.row-cell {
  display: inline-block;
  margin: 2px 20px;
}
.empty {
  margin: 30px 0 0 0;
}
</style>
