//login 表单记住数据state
const userInit = {
  username:{
    value:''
  },
  password:{
    value:''
  },
  remember:{
    value:false
  }
}

//用户登录 reducder
export function userReducer(state=userInit,action){
  switch(action.type){
    case 'reset':
      return {...state,...action.data};
    case 'resetUserName':
      return {...action.data};
    default:
      return state;
  }
}