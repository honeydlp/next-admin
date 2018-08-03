import React from 'react'
import dynamic from 'next/dynamic'

//VIEW 按需加载组件
const Loading = () => <div>Loading...</div>;
// sideBar
// 用户信息查询
const userSearch = dynamic(
  import('../../pages/subpage/userManagement/userSearch'),
  {
    loading: Loading
  }
)
// 其它
const SendJpush= dynamic(
  import('../../pages/subpage/other/sendJpush'),
  {loading: Loading}
)
//侧边栏 初始state AuthRoute 权限认证
export let navLinkInit = [
  { path: '',
    name: '用户管理',
    subMenu: [
    {   
      path: '/searchUserInfo',
      name: '用户信息检索',
      icon:'usergroup-add',
      component: userSearch,
      id: '10000',
    }
    ],
    icon:'file-text'
 },
  { path: '',
    name: '其它',
    subMenu: [
    {   
      path: '/SendJpush',
      name: '发送系统消息',
      icon:'eye-o',
      component: SendJpush,
      id: '10001',
    }
    ],
    icon:'setting'
 },
];

// 侧边栏reducer
export function sideBarReducer(state=navLinkInit,action){
  switch(action.type){
    case 'init':    //用户权限
      return action.data;
    default:
      return state;
  }
}
// 侧边栏未处理数量reducer
export function undealCount(state=0,action){
  switch(action.type){
    case 'undealCount':    //
      return action.data;
    case 'reductUndealCount':
      return state-1;
    default:
      return state;
  }
}



