<template>
  <div class="test-options">
    <h3>Practice</h3>
    <ul class="main-page-list">
      <li>
        <router-link to="/tests">
          <a>View Past Tests</a>
        </router-link>
      </li>
      <li>
        <router-link to="/test">
          <a>Start BJCP Process Test</a>
        </router-link>
      </li>
      <li>Start Style Test</li>
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
.main-page-list {
  list-style: none;
}
.main-page-list li {
  padding: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  float: left;
  margin-right: 40px;
  background: #fff;
  font-size: 1.2em;
}
.main-page-list li a {
  text-decoration: none;
}
</style>
