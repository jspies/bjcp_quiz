declare module '*.vue' {
  
  import VueRouter, { Route } from 'vue-router'
  
  interface Vue {
    $router: VueRouter
  }

  export default Vue
}