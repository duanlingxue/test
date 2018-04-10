<template>
  <div id="app">
    <app-header></app-header>
    <router-view style="position:relative;top:0.4rem;margin-bottom: 0.4rem;"/>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from '@/components/header'
  import AppFooter from '@/components/footer'
export default {
  name: 'App',
  components:{
    AppHeader,AppFooter
  }
}
</script>

<style>

</style>
