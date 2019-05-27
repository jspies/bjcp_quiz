<template>
  <div id="the-app">
    <div class="row">
      <Sidebar />
      <Login v-if="showingLogin" />
      <Signup v-if="showingSignup" />
      <CustomQuiz v-if="showingCustom" />
      <router-view class="main-content" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Sidebar from "@/components/Sidebar.vue";
import Login from "@/components/Login.vue";
import Signup from "@/components/Signup.vue";
import CustomQuiz from "@/components/CustomQuiz.vue";

export default {
  name: "app",
  components: {
    Sidebar,
    Login,
    Signup,
    CustomQuiz
  },
  computed: {
    ...mapState(["showingLogin", "showingSignup", "showingCustom"])
  },
  mounted() {
    this.$store.dispatch("loadUser");
  }
};
</script>

<style>
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
  min-height: 100%;
  display: block;
  overflow: hidden;
  padding: 0;
  position: relative;
  background: rgb(245, 247, 249);
}
#the-app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  position: relative;
  height: 100%;
  min-height: 100%;
  display: flex;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
}
.row {
  min-height: 100%;
  display: flex;
  flex-direction: row;
}
.main-content {
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
}
h3 {
  letter-spacing: -0.1ch;
  font-size: 1.3em;
}
button {
  display: inline-block;
  line-height: 1.1em;
  vertical-align: middle;
  border-radius: 10px;
  padding: 13px 16px;
  text-transform: uppercase;
  font-size: 1em;
  background: rgb(121, 8, 36);
  color: #fff;
  border: 0;
  font-weight: 500;
  margin-right: 20px;
}
</style>
