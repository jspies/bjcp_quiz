<template>
  <div id="home">
    <p class="info">Hone your beer knowledge.</p>
    <p>These exercises can help you learn more about beer styles and prepare for the BJCP exam.</p>
    <p>Just trying to memorize the BJCP style descriptions is tedious and not very effective. The best way to learn is to experience the beers and discuss them. These exercises are designed to supplement actual beer tasting.</p>
    <p>The questions are not actual exam questions, they are just designed to help learn beer styles by focusing on comparison. You can read more about the <router-link to="/methods"><a href="/methods">question methods.</a></router-link></p>
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