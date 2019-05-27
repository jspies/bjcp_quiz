<template>
  <div class="test-options">
    <h3>Practice</h3>
    <ul class="main-page-list">
      <li>
        <router-link to="/customTest">
          <a>Start Quiz</a>
        </router-link>
      </li>
      <li>
        <router-link to="/processTest">
          <a>Quick BJCP Process Quiz</a>
        </router-link>
      </li>
      <li>
        <router-link to="/styleTest">
          <a>Quick Style Quiz</a>
        </router-link>
      </li>
      <li>
        <router-link to="/tests">
          <a>View Past Tests</a>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Practice",
  props: {}
};
</script>

<style>
ul.main-page-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.main-page-list li {
  padding: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  float: left;
  margin-right: 40px;
  margin-bottom: 20px;
  background: #fff;
  font-size: 1.2em;
}
.main-page-list li a {
  text-decoration: none;
}
</style>
