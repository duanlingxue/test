<template>
    <div class="login">
      <p class="p"><label>账号</label><input type="text" v-model="userName"/></p>
      <p class="p"><label>密码</label><input type="password" v-model="userPassword" /></p>
      <button class="btn" style="margin-top: 20px;" @click="login">登录</button>
      <p class="login_a">去<router-link to="/mine/register" style="color:#4170f5">注册</router-link></p>
    </div>
</template>

<script>
  import api from '@/server/api'
    export default {
        name: "login",
      data(){
          return {
            userName:'',
            userPassword:'',
          }
      },
      mounted(){
          let that = this;
        document.onkeyup=(event)=>{
          if(event.keyCode==13){
            that.login()
          }
        }
      },
      methods:{
        login(){
          let params={
            userName:this.userName,
            userPassword:this.userPassword,
          }
          api.login(params).then((res)=>{
            this.$layer.msg(res.data.message)
            if(res.data.code==200){
              window.localStorage.userMsg = JSON.stringify(res.data.data)
              this.$router.push('/mine/mymsg');
            }
          })
        }
      }
    }
</script>

<style scoped>
.login{
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.login_a{
  margin-top: 0.2rem;
  text-align: right;
  padding-right:0.5rem;
}
</style>
