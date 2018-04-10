
import axios from 'axios';
import qs from 'qs'

const server = axios.create({
  baseURL: 'http://localhost:3000/', // api的base_url 在哪里有
  timeout: 50000,
  transformRequest: [function (data) {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    // data = qs.stringify({});
    return data;
  }],
  transformResponse: [function (data) {
    // 这里提前处理返回的数据
    return data;
  }],
  // 请求头信息
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  responseType: 'json',
})
export default server
