import service  from '../../request'

export function asyncUserListLoad(data){
  return async dispatch=>{
    let res = await service.get('../users/getUserList',{
      params: {
        pageNo: data.pageNo,
        pageSize: data.pageSize,
        ...data.formData
      }
    })
    if (res.status===200) {
        let result = res.data.result;
        dispatch({type:'listLoaded', data: {
          ...result,
          formData: data.formData
        }})
    }
  }
}

export function changePageSize(data){
  return { data, type: 'changePageSize' }
}

export function changeUserStatus(data, reloadData){
  return async dispatch=>{
    let res = await service.post('../users/changeUserStatus',{
      ...data
    })
    if (res.status===200) {
      if (res.data.result) {
        dispatch(asyncUserListLoad(reloadData));
      }
    }
  }
}

export function changePopularRank(data, reloadData){
  return async dispatch=>{
    let res = await service.get('',{
      params: { ...data }
    })
    if (res.status===200) {
      if (res.data.result) {
        dispatch(asyncUserListLoad(reloadData));
      }
    }
  }
}

export function changeLevelRank(data, reloadData){
  return async dispatch=>{
    let res = await service.post('../users/changeUserRankBan',{
      userId: data.userId,
      rankType: data.rankType,
      rankBanType: data.rankBanType
    })
    if (res.status===200) {
      if (res.data.result) {
        dispatch(asyncUserListLoad(reloadData));
      }
    }
  }
}

export function delNickNameAction(data, reloadData){
  return async dispatch=>{
    let res = await service.post('../users/delUserNickName',{
      userId: data.userId
    })
    if (res.status===200) {
      if (res.data.result) {
        dispatch(asyncUserListLoad(reloadData));
      }
    }
  }
}

export function delUserAvatarAction(data, reloadData){
  return async dispatch=>{
    let res = await service.post('../users/delUserHeaderThumb',{
      userId: data.userId
    })
    if (res.status===200) {
      if (res.data.result) {
        dispatch(asyncUserListLoad(reloadData));
      }
    }
  }
}

export function delUserTagAction(data, reloadData){
  return async dispatch=>{
    let res = await service.post('../users/delUserSignature',{
      userId: data.userId
    })
    if (res.status===200) {
      if (res.data.result) {
        dispatch(asyncUserListLoad(reloadData));
      }
    }
  }
}

export function showStatusHistoryAction(data){
  return async dispatch=>{
    let res = await service.get('../users/getUserStatusRecord',{
      params: {
        userId: data.userId
      }
    })
    if (res.status===200) {
      let result = res.data;
      dispatch({type:'showHistory', data: {
        type: 'status',
        title: data.title,
        noDataTip: data.noDataTip,
        content: result.record
      }})
    }
  }
}

export function showMessageHistoryAction(data){
  return async dispatch=>{
    let res = await service.get('../web/systemMsgRecord',{
      params: {
        userId: data.userId
      }
    })
    if (res.status===200) {
      let result = res.data;
      dispatch({type:'showHistory', data: {
        type: 'system',
        title: data.title,
        noDataTip: data.noDataTip,
        content: result.result
      }})
    }
  }
}

export function hideChangeHistoryAction(){
  return {type:'hideHistory', data: {}};
}