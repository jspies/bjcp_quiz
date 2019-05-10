import Vue from "vue";
import moment from "moment";

Vue.filter("percent", function(value) {
  const val = Number(value * 100);
  return `${(val &&
    val.toLocaleString(undefined, { maximumFractionDigits: 2 })) ||
    "0"}%`;
});

Vue.filter("formatDate", function(value) {
  if (value.seconds) {
    return moment.unix(value.seconds).format("YYYY-MM-DD");
  }
  if (value) {
    return moment(String(value)).format("YYYY-MM-DD");
  }
});

Vue.filter("testName", function(value) {
  switch(value) {
    case "process_test":
      return "BJCP Process";
    case "style_test":
      return "Beer Styles";
  }
});