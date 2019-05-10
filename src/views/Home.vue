<template>
  <div id="home">
    <p class="info">Hone your beer knowledge.</p>
    <Practice />
  </div>
</template>

<script>
import Practice from "@/components/Practice.vue";

export default {
  name: "home",
  components: {
    Practice
  }
};
</script>

<style>
#home {
  margin: 40px;
}
p.info {
  font-size: 1.2em;
}
</style>