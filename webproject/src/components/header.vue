<template>
  <div id="app-head">
      {{msg}}
  </div>
</template>

<script>
export default {
  name: 'sport-head',
  data () {
    return {
      msg: ''
    }
  },
  mounted(){
    if(this.msg==''){
      this.msg = this.$route.name;
    }
  },
  watch:{
    '$route':function (val) {
      this.msg = val.name;
    }
  }
}
</script>

<style >
</style>
