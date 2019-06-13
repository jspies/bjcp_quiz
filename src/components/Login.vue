<template>
  <div class="login">
    <h2>Login</h2>
    <input v-model="email" type="text" placeholder="Email" />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      v-on:keyup.13="login"
    />
    <div class="actions">
      <button v-on:click="login">Login</button>
      <button class="cancel" @click="close">Cancel</button>
      <a href="#" v-on:click="googs">Login with Google</a>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "login",
  data: function() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    login: function() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      })
      .then(e => {
        this.$store.dispatch("toggleLogin");
      })
    },
    close: function() {
      this.$store.dispatch("toggleLogin");
    },
    googs: function() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          if (result.user) {
            this.$store.dispatch("showMessage", `Logged in as ${result.user.email}`);
            this.$store.dispatch("toggleLogin");
          }
        })
        .catch((err) => {
          if (err.message) {
            this.$store.dispatch("showMessage", err.message);
          }
        });
    }
  }
};
</script>

<style scoped>
.login {
  display: block;
  width: 400px;
  max-width: 400px;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
  padding: 20px;
  z-index: 100;
}
.actions {
  margin: 10px auto;
}
input {
  margin: 10px auto;
  width: 90%;
  padding: 15px;
  border-radius: 5px;
  font-size: 1.1em;
}
</style>
