<template>
    <div class="history">
      <div class="top">
        <button @click = 'deleteHistory' class="btn" style="">
          清空
        </button>
      </div>
      <div v-if="score.length!=0">
        <p v-for="item in score" :key="'score'+item.id">
          <span>{{item.name}}</span>
          <span>{{item.time}}</span>
          <span>{{item.score}}</span>
        </p>
      </div>
      <div v-else style="text-align:center ">
        暂无历史记录
      </div>
    </div>
</template>

<script>
  import api from '@/server/api'
    export default {
        name: "history",
      data(){
          return {
            userId:0,
            score:[]
          }
      },
      mounted(){
        this.scoreHistory()
      },
      methods:{
        scoreHistory(){
          this.userId = JSON.parse(window.localStorage.userMsg).id
          api.history(this.userId).then((res)=>{
            this.score = res.data.data;
          })
        },
        deleteHistory(){
          api.deleteHistory(this.userId).then((res)=>{
            this.score = res.data.data
            this.$layer.msg(res.data.message)
          })
        }
      }
    }
</script>

<style scoped>
  .history{
    padding-top: 0.1rem;
  }
  .history .top{
    display: flex;
    justify-content: flex-end;
    padding-right:10px;
  }
.history p{
  width: 100%;
  margin: 30px 0 ;
  display: flex;
  justify-content: space-around;
}
</style>
