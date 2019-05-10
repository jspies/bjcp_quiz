<template>
  <div class="tests">
    <table v-if="user" class="tests">
      <thead class="table-header">
        <tr>
          <th class="col col1">Test</th>
          <th class="col col2">Date</th>
          <th class="col col3">Results</th>
          <th class="col col4">Score</th>
        </tr>
      </thead>
      <tbody class="results-table">
        <tr
          class="result-row"
          v-for="(test, index) in tests"
          v-bind:key="test.dateToken"
          v-on:click="gotoResults(index)"
        >
          <td class="col col1">
            {{ test.type | testName }}
          </td>
          <td class="col col2">
            <router-link :to="{ name: 'results', params: { testId: index } }">
              <a>{{ test.dateTaken | formatDate }}</a>
            </router-link>
          </td>
          <td class="col col3">
            {{ test.stats.correct }} / {{ test.stats.total }}
          </td>
          <td class="col col4">
            {{ (test.stats.correct / test.stats.total) | percent }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="empty" v-if="!user">
      Viewing your past tests is only available when you are logged in.
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "tests",
  computed: mapState({
    tests: state => state.tests.tests,
    user: function() {
      return this.$store.getters.getUser;
    }
  }),
  methods: {
    gotoResults: function(index) {
      this.$router.push({ name: "results", params: { testId: index } });
    }
  },
  mounted() {
    this.$store.dispatch("initTests");
  }
};
</script>

<style>
table.tests {
  margin: 40px;
  border-collapse: collapse;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0px 40px 0px rgba(37, 47, 60, 0.12);
  display: block;
  height: 100%;
  table-layout: fixed;
}
table.tests thead.table-header {
  display: table;
  width: 100%;
}
table.tests thead.table-header tr {
  line-height: 2;
  text-align: left;
  width: 100%;
}
table.tests thead.table-header tr th {
  padding: 16px;
  font-weight: 500;
  letter-spacing: -0.1ch;
}
table.tests tbody.results-table {
  display: block;
  overflow: auto;
  height: 100%;
  width: 100%;
}
table.tests tr {
  padding: 20px;
  display: table;
  line-height: 1.4;
  border-bottom: 1px solid #f2f2f2;
  width: 100%;
}
table.tests tr.result-row {
  cursor: pointer;
}
table.tests .col {
  width: 25%;
}
table.tests .col.col1 {
  width: 20%;
}
table.tests .col.col2 {
  width: 20%;
}
table.tests .col.col3 {
  width: 30%;
}
table.tests .col.col4 {
  width: 30%;
}
table.tests td {
  padding: 16px;
}
.empty {
  margin: 30px 0 0 0;
}
</style>
