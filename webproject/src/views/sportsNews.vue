<template>
    <div class="news">
      <div v-for="(item,index) in msg" :key="'news'+index" class="newsCard">
        <a @click = "info(item.id)">
          <h3 style="flex:2 2 auto">{{item.title}}</h3>
          <div style="flex:0 0 auto">
            <img :src="item.titleImg" :alt="item.title"/>
          </div>
        </a>
      </div>
    </div>
</template>

<script>
  import api from '@/server/api'
    export default {
        name: "sportsNews",
      data(){
          return {
            msg:[]
          }
      },
      mounted(){
        this.newsList()
      },
      methods:{
        newsList(){
          api.newsList().then((res)=>{
            this.msg = res.data.data;
          })
        },
        info(id){
          this.$router.push('/newsinfo/'+id)
        }
      }
    }
</script>

<style scoped>
  .news{
    padding-bottom: 0.4rem;
  }
.newsCard{
  padding: .15rem .1rem;
  border-bottom: 1px solid #f5f7f9;
}
  .newsCard a{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .newsCard div img{
    width: 1.5rem;
  }
</style>
