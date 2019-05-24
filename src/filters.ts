import Vue from "vue";
import moment from "moment";

Vue.filter("percent", function(value: number) {
  const val = Number(value * 100);
  return `${(val &&
    val.toLocaleString(undefined, { maximumFractionDigits: 2 })) ||
    "0"}%`;
});

interface Timestamp {
  seconds: number
}

Vue.filter("formatDate", function(value: string | Timestamp): string {
  
  if ((value as Timestamp).seconds) {
    return moment.unix((value as Timestamp).seconds).format("YYYY-MM-DD");
  }
  if (value) {
    return moment(String(value)).format("YYYY-MM-DD");
  }
  return "";
});

Vue.filter("testName", function(value: string): string {
  switch(value) {
    case "process_test":
      return "BJCP Process";
    case "style_test":
      return "Beer Styles";
    default:
      return "test";
  }
});