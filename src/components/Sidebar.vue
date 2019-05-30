<template>
  <div class="sidebar" v-bind:class="{retractable: sidebarRetracts}">
    <i class="fa-bars fas" v-bind:class="{retractable: sidebarRetracts}" v-on:click="toggleSidebar" id="sidebar-toggle"></i>
    <div v-if="user" id="user-mark">{{ user.email }}</div>
    <router-link to="/">
      <h1>
        <img src="/img/icons/beer-sprite.png" />
        Beer Study
      </h1>
    </router-link>
    <ul class="nav">
      <li class="sub">
        <ul>
          <li class="sub-header">
            Practice
          </li>
          <li class="recessed">
            <a v-on:click="showCustom">Take a Quiz</a>
          </li>
          <li class="recessed">
            <router-link to="/processTest">
              <a>BJCP Process Quiz</a>
            </router-link>
          </li>
          <li class="recessed">
            <router-link to="/styleTest">
              <a>Start Style Quiz</a>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="nav">
      <li class="nav-header">
        Account
      </li>
      <li v-if="!user" class="recessed">
        <a v-on:click="showLogin">Login</a>
      </li>
      <li v-if="!user" class="recessed">
        <a v-on:click="showSignup">Signup</a>
      </li>
      <li v-if="user" class="recessed">
        <router-link to="/tests">
          <a>Past Results</a>
        </router-link>
      </li>
      <li v-if="user" class="recessed">
        <router-link to="/logout">
          <a>Logout</a>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Sidebar",
  data: function() {
    return {
      sidebarRetracts: true
    }
  },
  computed: {
    ...mapState(["banner"]),
    user: function() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    showLogin: function() {
      this.$store.dispatch("toggleLogin");
    },
    showSignup: function() {
      this.$store.dispatch("toggleSignup");
    },
    showCustom: function() {
      this.$store.dispatch("toggleCustom");
    },
    toggleSidebar: function() {
      this.sidebarRetracts = !this.sidebarRetracts;
    }
  }
};
</script>

<style scoped>
#user-mark {
  position: fixed;
  top: 0px;
  right: 0px;
  color: rgb(37, 47, 61);
}
#sidebar-toggle {
  position: relative;
  top: 0px;
  display: none;
  left: 256px;
  color: rgb(37, 47, 61);
}
h1 {
  color: #fff;
  font-weight: 500;
  font-size: 24px;
  letter-spacing: -0.05em;
  margin: 0;
  padding: 10px 20px;
}
h1 img {
  vertical-align: bottom;
}
.sidebar {
  color: #e5e5e5;
  position: relative;
  top: 0;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  margin: 0;
  left: 0;
  bottom: 0;
  width: 256px;
  text-align: left;
  background: rgb(37, 47, 61);
}
.sidebar a {
  text-decoration: none;
  color: #e5e5e5;
  cursor: pointer;
}
.sidebar ul {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid #606060;
}
.sidebar ul li {
  margin: 0;
}
.sidebar ul li.recessed {
  background: rgb(25, 32, 43);
  padding: 5px 10px 5px 30px;
  font-size: 0.9em;
  color: #a5a5a5;
  font-weight: 500;
}
.sidebar .nav-header {
  font-weight: 500;
  font-size: 16px;
  color: #fff;
  padding: 20px 20px 10px 30px;
  border-bottom: 1px solid #606060;
  border-top: 1px solid #606060;
}
.sidebar .sub-header {
  font-weight: 500;
  background: rgb(25, 32, 43);
  font-size: 16px;
  color: #fff;
  padding: 20px 20px 10px 30px;
}
.sub {
  padding-bottom: 20px;
  background: rgb(25, 32, 43);
}

@media only screen and (max-width: 600px) {
  .sidebar.retractable {
    margin-left: -256px;
  }
  
  #sidebar-toggle {
    display: block;
    height: 0;
    color: white;
    margin-left: -30px;
    margin-top: 10px;
  }
  #sidebar-toggle.retractable {
    margin-left: 10px;
    color: #000;
  }
}
</style>
