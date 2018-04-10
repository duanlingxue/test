import fetch from '../utils/fetch'

export default {
  login(params){
    return fetch({
      url:'login',
      method:'post',
      data:'userName='+params.userName+'&userPassword='+params.userPassword
    })
  },

  register(params){
    return fetch({
      url:'register',
      method:'post',
      data:'userName='+params.userName+'&userPassword='+params.userPassword
    })
  },

  settingInit(userId){
    return fetch({
      url:'settingSelect?userId='+userId,
      method:'get',
    })
  },
  setScore(params){
    return fetch({
      url:'setScore',
      method:'post',
      data:JSON.stringify(params),
      headers: {"Content-Type": "application/json"}
    })
  },

//  上传分数
  uploadScore(params){
    return fetch({
      url:'upload',
      method:'post',
      data:JSON.stringify(params),
      headers: {"Content-Type": "application/json"}
    })
  },
  //  历史记录
  history(userId){
    return fetch({
      url:'history?userId='+userId,
      method:'get',
    })
  },
  //  删除历史记录
  deleteHistory(userId){
    return fetch({
      url:'deleteHistory?userId='+userId,
      method:'get',
    })
  },
  //  查询新闻列表
  newsList(){
    return fetch({
      url:'newsList',
      method:'get',
    })
  },
  //  查询新闻详情
  newsInfo(id){
    return fetch({
      url:'newsInfo?id='+id,
      method:'get',
    })
  },
}
