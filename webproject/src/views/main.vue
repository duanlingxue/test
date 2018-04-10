<template>
    <div class="main">
      <button style="position: absolute;right: 10px;top: 10px;" class="btn" @click="edit=true;flag=0;start()" v-if="record.length!=0&&!edit&&userId!=0">
        编辑
      </button>
      <button style="position: absolute;right: 10px;top: 10px;"  class="btn" v-if="edit" @click="edit=false;">
        取消
      </button>
      <button style="position: absolute;right: 10px;top: 50px;"  class="btn" v-if="edit" @click="upload">
        上传
      </button>
      <div id="showtime">
        <span>{{minStr}}</span>
        <span>:</span>
        <span>{{secStr}}</span>
        <span>:</span>
        <span>{{msStr}}</span>
      </div>
      <div class="bnt">
        <button v-text = "flag?'复位':'记次'" @click="remTime"></button>
        <button  v-text = "flag?'启动':'停止'" @click="start"></button>
      </div>
      <!--记录显示的次数-->
      <div id="record">
        <p v-if="errors.has('num')" class="validate-error">请输入学号切必须为数字</p>
        <p v-for="(item,index) in record" :key="'count'+index" >
          <span>成绩{{index+1}}</span>
            <input type="text" placeholder="请输入学号" v-if="edit" class="edit_input" v-model="item.num"
                  name="num"
                   v-validate="'required|numeric'"
            >
          <span>{{item.time}}</span>
          <span style="font-size: 16px">{{item.score}}</span>
        </p>

      </div>
    </div>
</template>

<script>
  import api from "@/server/api.js"
    export default {
        name: "mainSec",
      data(){
          return {
            min:0,
            sec:0,
            ms:0,
            minStr:'00',
            secStr:'00',
            msStr:'00',
            timer:null,
            count:0,
            flag:1, //0计次、停止   1复位 、启动
            record:[],
            edit:false,
            scoreRule:[],
            userId:0,
          }
      },
      mounted(){
        this.setScore();
      },
      methods:{
          start(){
            var timer;
            if(this.flag==1){
                this.flag=0;
                clearInterval(this.timer)
                this.timer = setInterval(()=>{
                  this.show()
                },10)
            }else {
              this.flag=1;
              this.stop();
            }
          },
        stop(){
          clearInterval(this.timer)
        },
        remTime(){
          if(this.flag==1){
            this.minStr ='00';
            this.secStr='00';
            this.msStr='00';
            this.ms=0;
            this.sec=0;
            this.min=0;
          }else{
            let time = this.minStr+':'+this.secStr+':'+this.msStr;
            let msTime = this.timeChage(time);
            let score='尚未设置';
            this.scoreRule.map((item)=>{
              if(item.min<=msTime&&msTime<item.max){
                score = item.score;
              }
            })
            let obj = {
              num:'',
              time,
              score,
            }
            this.record.push(obj);
          }
        },
         show(){
            this.ms++;
          if(this.sec==60){
            this.min++;this.sec=0;
          }
          if(this.ms==100){
            this.sec++;this.ms=0;
          }
          this.msStr = this.ms
          if(this.ms<10){
            this.msStr="0"+this.ms;
          }
          this.secStr = this.sec;
          if(this.sec<10){
            this.secStr="0"+this.sec;
          }
          this.minStr = this.min
          if(this.min<10){
            this.minStr="0"+this.min;
          }
        },
        timeChage(time){
          let timearr = time.split(':');
          let ms = Number(timearr[2]);
          let sec = Number(timearr[1]*100);
          let min = Number(timearr[0]*100*60);
          return min + sec + ms;
        },
        setScore(){
          if(window.localStorage.userMsg){
            this.userId = JSON.parse(window.localStorage.userMsg).id;
          }else{
            this.$layer.msg('尚未登录')
          }

            api.settingInit(this.userId).then((res)=>{
              let scoreRule = res.data.data;
              scoreRule.map((item)=>{
                item.min = this.timeChage(item.min)
                item.max = this.timeChage(item.max)
              })
              this.scoreRule = scoreRule;
            })
        },
        upload(){
          this.$validator.validateAll().then((res)=> {
            if (res) {
              this.record.map((item)=>{
                item.userId = this.userId
              });
              api.uploadScore(this.record).then((res)=>{
                this.record = []
                this.edit = false
                this.$layer.msg(res.data.message)
              })
            }
          })
        }
      }
    }
</script>

<style scoped>
  .main{
    position: relative;
    text-align: center;
    padding-top: 0.3rem;
  }
  #showtime{
    margin: 0.2rem 0;
    font-size: 20px;
  }
  #record p{
    height: 0.4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
  }
  .bnt button{
    width:0.5rem;
    height:0.5rem;
    border-radius: 50%;
    border:0;outline:none ;
    margin:0 0.1rem;
  }
  .edit_input{
    outline: none;
    border: 1px solid #f5f5f5;
    height: 0.3rem;
    width: 1.2rem;
    border-radius: 5px;
  }
</style>
