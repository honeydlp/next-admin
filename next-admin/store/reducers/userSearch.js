let initData = {
	list: [],
	changeHistory: {
		type: '',
		visible: false,
		title: '',
		content: [],
		noDataTip: ''
	},
	formData: {},
	pageNo: 0,
  	pageSize: 25,
  	totalPages: 0,
  	totalRecords: 0
}

export function userSearchReducer(state=initData, action) {
	switch(action.type){
		case 'listLoaded': 
			return {...state, ...action.data}
		case 'changePageSize': 
			return {...state, ...action.data}
		case 'delNickName':
			return {...state, ...action.data}
		case 'delUserAvatar':
			return {...state, ...action.data}
		case 'delUserTag':
			return {...state, ...action.data}
		case 'showHistory':
			let showHistory = action.data;
			showHistory.visible = true;
			return {...state, changeHistory: showHistory}
		case 'hideHistory':
			let hideHistory = { ...state.changeHistory };
			hideHistory.visible = false;
			return {...state, changeHistory: hideHistory}
		case 'changeUserStatus':
			return state;
		case 'changePopularRank':
			return state;
		case 'changeLevelRank':
			return state;
		default: 
			return state;
	}
}