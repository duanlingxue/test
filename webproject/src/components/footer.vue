<template>

  <div id="app-foot">
    <router-link to="/"><a>资讯</a></router-link>
    <router-link to="/main"><a>计时</a></router-link>
    <router-link to="/mine"><a>我的</a></router-link>
  </div>
</template>

<script>
export default {
  name: 'foot',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style scoped>
  a{
    flex:1;
    display: flex;
    justify-content: center;
    color:#0d110f;
  }
</style>
