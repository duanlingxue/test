<template>
    <div class="newsInfo">
      <h1>
        {{msg.title}}
      </h1>
      <p>
        {{msg.content}}
      </p>
      <img :src="msg.imgUrl"/>
      <p>
        {{msg.contentbuttom}}
      </p>
    </div>
</template>

<script>
  import api from '@/server/api'
    export default {
        name: "newsInfo",
      data(){
          return {
            msg:{}
          }
      },
      beforeMount(){
          this.newsInfo()
      },
      methods:{
        newsInfo(){
          api.newsInfo(this.$route.params.id).then((res)=>{
            this.msg = res.data.data;
          })
        }
      }
    }
</script>

<style scoped>
  .newsInfo{
    padding: 15px 8px ;

  }
  .newsInfo h1{
    font-size: 20px;
    color: #404040;
    line-height: 1.5;
  }
  .newsInfo p{
    margin-top: 0.25rem;
    line-height: 1.8;
    text-indent:2em;
  }
  .newsInfo img{
    display: block;
    max-width: 100%;
    margin: 0.2rem 0;
  }
</style>
