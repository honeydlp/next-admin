// 登录模块
import service  from '../../request'
import md5 from 'js-md5'
import { qsStringify } from '../../utils/tools'

//action
// 重置登录
export function userAction(data){
  return {data,type:'reset'}
}
// 重置用户名
export function userName(data){
  return {data,type:'resetUserName'}
}
/**
 * 异步登录
 * @param {*userName,userPwd} data 
 */
export function login(data){
  const {username,password,remember}= data;
  return async dispatch=>{
    let res = await service.post('/web/login',{
      userName:username,userPwd:md5(password)
    },{
      transformRequest: [function (data) {
        return qsStringify(data)
      }]
    }
  ) 
    if (res.status===200) {
      localStorage.setItem('token',res.data.result)
      localStorage.setItem('userName',username)
      if(remember){
        dispatch(userAction(filterLoginData(data)))
      }else{
        dispatch(userName(filterLoginData({username: username,password:'',remember:false})))
      }
    }
  }
}

function filterLoginData(data){
  let tempObj = {}
  for(let key in data){
    tempObj[key] = {}
    tempObj[key]['value'] = data[key]
  }
  return tempObj
}