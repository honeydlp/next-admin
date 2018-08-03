import React from 'react';
import { Icon } from 'antd';

let userConfig = {
	statusList: {
		0: '正常',
		2: '封号'
	},
	reasonList: ['存在严重违规行为', '涉嫌黑卡充值', '发布违规内容', '使用外挂', '资料严重违规'],
	rankBanList: {
		0: '正常',
		1: '屏蔽'
	},

	gender: function (gender) {
  		if (gender === 1) {//男
      		return <Icon type="man" style={{color:'rgb(79,182,255)',fontSize:'13px'}}/>
		}
		if (gender === 2) {
			return <Icon type="woman" style={{color:'rgb(255,125,125)',fontSize:'13px'}}/>
		}
		return '未知'; 
	}
}

export default userConfig;