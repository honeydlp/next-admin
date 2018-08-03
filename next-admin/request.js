import axios from 'axios';
import { message } from 'antd';
import { getBaseName,qsStringify } from './utils/tools'
// 创建axios实例
const service = axios.create({
    transformRequest: [function (data) {
      return qsStringify(data)
    }]
});
// request拦截器
service.interceptors.request.use(config => {
  let token = localStorage.getItem('token');
  if (token) {
    config.headers['token'] = token; 
  }
  return config;
}, error => {
  Promise.reject(error);
})
// respone拦截器
service.interceptors.response.use(
  response => {
    if(response.data.err_code){
      message.error(response.data.err_msg,3)
       //返回登陆页面 
      if(response.data.err_code === "12000" || response.data.err_code === "12001"){

      }
      return Promise.reject(response.data.err_msg)
    }else{
      return response
    }
  },
  error => {
    //console.log('err' + error);
    message.error(error.message,5)
    return Promise.reject(error);
  }
)

export default service;
