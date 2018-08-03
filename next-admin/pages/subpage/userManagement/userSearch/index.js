import React from 'react';
import { connect } from 'react-redux'

import { asyncUserListLoad } from '../../../../store/actions/userSearch'

import ManageContainer from '../../../../components/wrapDecorator/manageContainer'
import Surround from '../../../../components/wrapDecorator/surround';
import Layout from '../../../pageLayout/index'

import SearchForm from './searchForm';
import SearchList from './searchList';

import './index.css';


@connect(
	state =>({user: state.userSearchReducer}),
	{asyncUserListLoad}
)   

class UserSearch extends React.Component {
	
	handleSubmit = (data) => {
        this.props.asyncUserListLoad({
      		pageNo: 0,
        	pageSize: this.props.user.pageSize,
         	formData: data
        });
    }

	render() {
		return (
			<Layout>
				<ManageContainer>
						<div className="report-content">
						<Surround theme="red" title="筛选">
							<div className="report-search">
								<SearchForm handleSubmit = {this.handleSubmit} />
							</div>
							</Surround>
							<Surround theme="blue" title="用户列表">
								<div className="report-table">
									<SearchList />
									</div>
								</Surround>
						</div>
				</ManageContainer>
			</Layout>
		)
	}
}

export default UserSearch;