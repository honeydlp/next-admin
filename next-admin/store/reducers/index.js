// 将Reducers整合在一起
import { combineReducers } from 'redux'
import {
	sideBarReducer
	} from './common';

import { userReducer } from './login'
import { userSearchReducer } from './userSearch'

export default combineReducers({
	sideBarReducer,
	userReducer,
	userSearchReducer
})