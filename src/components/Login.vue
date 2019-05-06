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
    </div>
  </div>
</template>

<script>
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
