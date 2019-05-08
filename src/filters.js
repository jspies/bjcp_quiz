import Vue from "vue";

Vue.filter("percent", function(value) {
  const val = Number(value * 100);
  return `${(val &&
    val.toLocaleString(undefined, { maximumFractionDigits: 2 })) ||
    "0"}%`;
});

Vue.filter("testName", function(value) {
  switch(value) {
    case "process_test":
      return "BJCP Process";
    case "style_test":
      return "Beer Styles";
  }
});