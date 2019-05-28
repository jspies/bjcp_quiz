<template>
  <div id="message-bar" v-if="showMe">
    {{ msg }}
    <a class="close" href="#" v-on:click="close">X</a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';

@Component({
  computed: mapState({
    showMe: state => state.messageBar.show,
    msg: state => state.messageBar.message
  })
})
export default class MessageBar extends Vue {

  close() {
    this.$store.dispatch('hideMessage');
  }
}
</script>

<style scoped>
#message-bar {
  line-height: 1.6;
  font-size: 18px;
  padding: 20px;
  text-align: left;
  color: #fff;
  background: #339cff;
  z-index: 1;
  position: fixed;
  left: 0;
  right: 0;
  margin-left: 256px;
}
#message-bar a.close {
  position: absolute;
  right: 20px;
  color: #fff;
  text-align: right;
  text-decoration: none;
  font-weight: 800;
}
</style>