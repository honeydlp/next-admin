import React from 'react'
import { Icon } from 'antd'

export let tagArr = ['无', '色情'];
export let statusArr = ["正常", "待审核", "封号永久", "低质量", "封禁设备", "封号一天"]
export let registerTypeFn = (registerType,phone) => {
  let registerTypeStr ;
  if (registerType === 1) {
    registerTypeStr = phone;
  } else if (registerType === 2) {
    registerTypeStr = 'QQ';
  } else if (registerType === 3) {
    registerTypeStr = '微博';
  } else if (registerType === 4) {
    registerTypeStr = '微信';
  }
  return registerTypeStr
}
export let genderFn = (gender) => {
  if(gender === 0){
    return '未知'
  }else{
    if(gender === 1) {//男
      return <Icon type="man" style={{color:'rgb(79,182,255)',fontSize:'13px'}}/>
    }else{
      return <Icon type="woman" style={{color:'rgb(255,125,125)',fontSize:'13px'}}/>
    }
  }
}

export let tempUserType = ['游客', '普通']