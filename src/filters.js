import Vue from "vue";

Vue.filter("percent", function(value) {
  const val = Number(value * 100);
  return `${(val &&
    val.toLocaleString(undefined, { maximumFractionDigits: 2 })) ||
    "0"}%`;
});
