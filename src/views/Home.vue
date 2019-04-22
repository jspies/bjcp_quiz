<template>
  <div class="home">
    <StartTest />
  </div>
</template>

<script>
// @ is an alias to /src
import StartTest from "@/components/StartTest.vue";

export default {
  name: "home",
  components: {
    StartTest
  }
};
</script>
