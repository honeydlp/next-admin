// 公用的 actions和数据获取模块
import service  from '../../request'
import { navLinkInit } from '../../store//reducers/common'

// 过滤sideBar数据
function filterNav(permissID,navLink){ //str obj
  let tempList = []
  navLink.map(v=>{
    if(v.path){
      if(permissID.indexOf(v.id)>-1){
        tempList.push(v)
      }
    }else{
      v.subMenu.map(item => {
        if(permissID.indexOf(item.id)>-1){
          let tempName = v.name;
          let listIndex = hasName(tempName,tempList)
          if(listIndex!==-1){
            tempList[listIndex]['subMenu'].push(item)
          }else{
            tempList.push({
              path :'',
              name:v.name,
              subMenu:[
                item
              ],
              icon:v.icon
            })
          }
        }
      })
    }
    return null;
  })
  return tempList
}

// 判断对象是否含有某个key
function hasName (name,menuList){ //str,obj
  let listIndex = -1
  menuList.map( (item,index) => {
    if(item.name === name){
      listIndex = index
    }
  })
  return listIndex
}

// 获取权限列表
export  function getPermissionList() {
  return  service.get('web/getAdminPermission',
  {params: {userName:localStorage.getItem('userName')}}
) 
}

//action 
// 侧边栏
export function sideBarAction(data){
  return {data,type:'init'}
}
// 异步获取侧边栏
export function sideBarActionAsync(permissionId){
  return async (dispatch,state)=> {
    if(!permissionId){
      let res = await getPermissionList()
      if(res.data){
        permissionId = res.data.permissionId
        localStorage.setItem('permissionId',permissionId)
      }
    }
    let navLinkFilter =  filterNav(permissionId,navLinkInit)
    dispatch(sideBarAction(navLinkFilter))
    return navLinkFilter
  }
}

