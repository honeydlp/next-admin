import React from 'react'
import { Checkbox,Radio,Input,Button,message,Tooltip } from 'antd';
import { sendJpush } from '../../../../store/actions/other'
import ManageContainer from '../../../../components/wrapDecorator/manageContainer';
import Layout from '../../../pageLayout/index'
import './index.css'

const RadioGroup = Radio.Group;

const genderTagsList = [ ['gender_1','gender_2'],['gender_1'],['gender_2']]

const stylePadding = {
    'paddingLeft':'10px'
}

let filterSendData =(data)=>{
    let { userId,content,isMessageOnly,sendType,device,genderTags,duration} = data
    let nickId=userId
    if(isMessageOnly){
        isMessageOnly = 2
    }else{
        isMessageOnly = 1
    }
    if(sendType==='someone'){
        device = 0;
        genderTags = '';
    }else{
        device = 0;
        genderTags = genderTagsList[genderTags];
    }
    return {
        nickId,content,isMessageOnly,sendType,device,genderTags,duration
    }
}

class SendJpushPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            "userId" : '',
            "content" : '',
            "isMessageOnly" : false,
            "sendType" : 'someone',
            "device" : 0,
            "duration": 5,
            "genderTags":0,
            "userIdVisble":false,
            "contentVisble":false
        }
    }
    onChange = (e,key)=>{
        let val = e.target.value
        if(key==='duration'){
            val=val.replace(/\D/g,'');
        }
        this.setState({
            [key]: val,
        });
        if(key==='sendType'){
            if(val==='all'){
                this.setState({
                    "userId":''
                })
            }else{
                this.setState({
                    "device" : 0,
                })
            }
        }
        if(key ==='userId'){
            if(val===''){
                this.setState({
                    userIdVisble:true
                })
            }else{
                this.setState({
                    userIdVisble:false
                })
            }
        }
        if(key ==='content'){
            if(val===''){
                this.setState({
                    contentVisble:true
                })
            }else{
                this.setState({
                    contentVisble:false
                })
            }
        }
        if(key === 'isMessageOnly'){
            this.setState({
                [key]: e.target.checked,
            }); 
        }
    }
    sendJpush = ()=>{
        let pCode,flag=0,userId;
        if(this.state.sendType === 'someone'&&!this.state.userId){
            this.setState({
                userIdVisble:true
            })
            ++flag;
        }
        if(!this.state.content){
            this.setState({
                contentVisble:true
            })
            ++flag;
        }
        if(this.state.contentVisble||this.state.userIdVisble||flag!==0){
            return
        }
        if(this.state.sendType === 'all'){
            
            pCode = prompt("请输出发送全服验证码", "")
            if(pCode){
                userId = pCode
            }else{
                message.error('未输入全服验证码,发送失败',3)
                return 
            }
        }
        let filterData = filterSendData({
            ...this.state,"userId" : this.state.sendType==='all'?userId:this.state.userId,
        })
        let res = sendJpush(filterData)
        if(res){
            this.setState({
                'content':''
            })
        }
    }
    render(){
        return (
        <Layout>
            <ManageContainer>
                <div className="user-table">
                    <div className="table-header-tit">系统消息
                    </div>
                    <div className="table-main">
                        <table border="1" cellSpacing="0" cellPadding="0">
                            <thead>
                                <tr>
                                    <th width="40%">用户Id</th>
                                    <th width="35%">消息内容</th>
                                    <th width="25%">是否显示通知栏</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="sendJpush-checkBox">
                                            <RadioGroup onChange={(e)=>this.onChange(e,'sendType')} value={this.state.sendType}>
                                                <Radio value='someone' style={{marginBottom:5}}>指定用户</Radio>
                                                <br/>
                                                <Radio value='all' style={{marginBottom:5}}>群发</Radio>
                                            </RadioGroup>
                                            <div>
                                                {
                                                    this.state.sendType === 'all' ?(
                                                        <div className="sendJpush-all-box">
                                                            <div className="sendJpush-item">
                                                                <RadioGroup  onChange={(e)=>{this.onChange(e,'device')}} value={this.state.device}>
                                                                    <Radio value={0}>全部</Radio>
                                                                    <Radio value={1}>安卓</Radio>
                                                                    <Radio value={2}>IOS</Radio>
                                                                </RadioGroup>
                                                                
                                                                <br />
                                                            </div>
                                                            <div className="sendJpush-item">     
                                                                <RadioGroup  onChange={(e)=>{this.onChange(e,'genderTags')}} value={this.state.genderTags}>
                                                                    <Radio value={0}>全部</Radio>
                                                                    <Radio value={1}>男</Radio>
                                                                    <Radio value={2}>女</Radio>
                                                                </RadioGroup>
                                                                <br />   
                                                            </div>
                                                            <div className="sendJpush-item">
                                                                推送将分布在 <Input value={this.state.duration}   onChange={(e)=>this.onChange(e,'duration')} 
                                                                style={{width:"63px",paddingLeft:0,paddingRight:0,textAlign:"center"}} /> 分钟内完成
                                                            </div>
                                                        </div>
                                                    ):( <Tooltip placement="topRight" title="用户ID不能为空" visible={this.state.userIdVisble}>
                                                            <Input onChange={e => this.onChange(e,'userId')} className="sendJpush-userId" />
                                                        </Tooltip>)
                                                }
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Tooltip placement="topRight" title="消息内容不能为空" visible={this.state.contentVisble}>
                                            <textarea onChange={(e)=>this.onChange(e,'content')} name="" id="" cols="30" rows="10" style={{width:"380px",height:"125px","marginTop":'5px'}} value={this.state.content}></textarea>
                                        </Tooltip >
                                    </td>
                                    <td>
                                        <Checkbox onChange={(e)=>this.onChange(e,'isMessageOnly')}></Checkbox>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{textAlign:'center',marginTop:'24px'}}>
                            <Button type="primary" onClick={this.sendJpush}>发送</Button>
                        </div>
                    </div>
                </div>
            </ManageContainer>
        </Layout>)
    }
}

export default SendJpushPage