import service from '../../request'
import { message } from 'antd'
const timeConfig = 3;
export async function sendJpush(data){
  let res = await service.post('web/sendJpush',
  data)
  let result = res.data
  if(result.result === true){
    //清空状态
    message.success('发送成功',timeConfig)
    return true
  }
  if(result.result === false){
    //保留
    message.error('发送失败',timeConfig)
    return false
  }
}