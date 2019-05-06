<template>
  <header v-if="banner">
    <ul class="menu">
      <li>
        <router-link :to="{ name: 'home' }">
          <a>Home</a>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'tests' }">
          <a>Past Tests</a>
        </router-link>
      </li>
      <li class="user-related" v-if="!user" :class="{ active: showLogin }">
        <a
          v-on:click="
            showLogin = !showLogin;
            showSignup = false;
          "
        >
          Login
        </a>
        <Login v-if="showLogin" />
      </li>
      <li class="user-related" v-if="!user" :class="{ active: showSignup }">
        <a
          v-on:click="
            showSignup = !showSignup;
            showLogin = false;
          "
        >
          Signup
        </a>
        <Signup v-if="showSignup" />
      </li>
      <li class="user-related" v-if="user">
        {{ user.email }}
      </li>
    </ul>
  </header>
</template>

<script>
import { mapState } from "vuex";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

export default {
  name: "banner",
  data: function() {
    return {
      showLogin: false,
      showSignup: false
    };
  },
  components: {
    Login,
    Signup
  },
  computed: {
    ...mapState(["banner"]),
    user: function() {
      return this.$store.getters.getUser;
    }
  }
};
</script>

<style>
header {
  background: rgb(36, 46, 69);
  color: rgb(190, 167, 48);
}
header ul {
  list-style: none;
  margin: 0 auto;
  text-align: left;
  max-width: 800px;
}
header ul li {
  display: inline-block;
  margin: 10px 20px;
  cursor: pointer;
  padding: 5px 10px;
}
header ul li a {
  font-weight: 700;
  position: relative;
  color: rgb(190, 167, 48);
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.9em;
}
header ul li.user-related {
  float: right;
}
header ul li.active {
  background: #fff;
  border-top: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.highlight {
  color: rgb(121, 8, 36);
}
</style>
