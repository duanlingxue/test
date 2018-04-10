<template>
  <div class="register">
    <p class="p"><label>账号</label><input type="text" v-model="userName"/></p>
    <p class="p"><label>密码</label><input type="password" v-model="userPassword" /></p>
    <button class="btn" style="margin-top: 20px;" @click="register">注册</button>
    <p class="register_a">去<router-link to="/mine/login" style="color:#4170f5">登录</router-link></p>
  </div>
</template>

<script>
  import api from '@/server/api'
    export default {
        name: "mine",
      data(){
          return {
            userName:'',
            userPassword:'',
          }
      },
      mounted(){

      },
      methods:{
        register(){
          let params = {
            userName:this.userName,
            userPassword:this.userPassword,
          }
          api.register(params).then((res)=>{
              this.$layer.msg(res.data.message)
            if(res.data.code==200){
              this.$router.push("/mine/login")
            }
          })
        }
      }
    }
</script>

<style scoped>
  .register{
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
  .register_a{
    margin-top: 0.2rem;
    text-align: right;
    padding-right:0.5rem;
  }
</style>
