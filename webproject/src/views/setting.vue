<template>
    <div class="setting">
      <button class="btn" style="position: relative;
          left: 75%;
          top: 10px;"
        @click="flag=false;$layer.msg('时间格式请输入“分：秒：毫秒”')"
              v-if="flag"
          >编辑</button>
      <button class="btn" v-if="!flag" style="position: relative; left: 75%;top: 10px;" @click="setScore">确定</button>
      <button class="btn" v-if="!flag" @click="newSet" style="position: relative; left: 33%;top: 10px;">新增</button>
      <button class="btn" v-if="!flag" style="position: relative; left: -8%;top: 10px;" @click="flag = true">取消</button>
      <div v-if="data.length!=0">
        <p v-for="(item,index) in data" :key="'item'+index" >
          <input type= "text" placeholder="最小时间" v-model="item.min" :disabled="flag"/>
          <span>&lt;=</span>
          <input type="text" placeholder="最大时间" v-model="item.max" :disabled="flag"/>
          <input type="number"  placeholder="分数" v-model="item.score" :disabled="flag"/>
        </p>
      </div>
      <div v-else>
        暂无配置
      </div>
    </div>
</template>

<script>
  import api from '@/server/api'
    export default {
        name: "setting",
      data(){
          return {
            flag:true,
            data:[]
          }
      },
      mounted(){
        this.settingInit()
      },
      methods:{
        settingInit(){
          let userId = JSON.parse(window.localStorage.userMsg).id
          api.settingInit(userId).then((res)=>{
            this.data = res.data.data;
          })
        },
        newSet(){
          let obj = {
            min:'',
            max :'',
            score:0,
          }
          this.data.push(obj)
        },
        setScore(){
          let arr = this.data;
          arr.map((item)=>{
            item.userId = JSON.parse(window.localStorage.userMsg).id
          })
          console.log(arr)
          api.setScore(arr).then((res)=>{
            this.$layer.msg(res.data.message)
            this.flag = true;
            this.$router.push('/mine/mymsg')
          })
        }
      }
    }
</script>

<style scoped>
.setting p{
  width: 100%;
  margin: 30px 0 ;
  display: flex;
  justify-content: space-around;
}
.setting p input{
  width: 20%;
}
</style>
