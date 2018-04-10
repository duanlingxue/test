<template>
    <div class="mine">
       <div class="title" >
         <button @click="loginOut">
           登出
         </button>
          <img src="static/img/logo.jpg" />
         <p>{{user}}</p>
       </div>
      <p @click = "$router.push('/mine/history')">
        历史记录
      </p>
      <p @click = "$router.push('/mine/setting')">
        分数设置
      </p>
    </div>
</template>

<script>
    export default {
        name: "mine",
      data(){
          return {
            user:'',
          }
      },
      mounted(){
        this.user = JSON.parse(window.localStorage.userMsg).name
      },
      methods:{
        loginOut(){
          localStorage.removeItem('userMsg');
          this.$router.push('/mine/login')
        }
      }
    }
</script>

<style scoped>
.mine .title{
  height: 1.5rem;width: 100%;background: #d4d4e7;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color:#fff;
  position: relative;
}
.mine .title button{
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
  background: #d4d4e7;
  border: none;
  color: #4170f5;
}
.mine .title img{
  width: 0.8rem;
  height:0.8rem;
  border-radius: 50%;
  background: aliceblue;
}
  .mine>p{
    height:0.5rem;
    width:100%;
    display: flex;
    align-items: center;
    padding-left: 0.1rem;
    margin: 20px 0;
    background: #f1f1f1;
  }
</style>
