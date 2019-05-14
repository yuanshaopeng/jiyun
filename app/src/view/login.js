import React,{Component} from "react";
import axios from "axios";
import { 
    Input,
    Button,
    message
 } from 'antd';
import "../assets/css/login.css";
import {login} from "../api/index";
import md5 from "js-md5";
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName:"",
            passWord:""
        }
    }
    handleInput(ev){
        this.setState({
            [ev.target.name]:ev.target.value,
        })
    }
    handleClick(ev){
        let {userName,passWord} = this.state;
        login({
            userName,
            passWord:md5(passWord)
        })
        .then(res=>{
            console.log('run login success');
            if(res.data.state=="1"){
                sessionStorage.setItem("uid",res.data.code.uid);
                sessionStorage.setItem("tokenID",res.data.code.tokenID);
                // console.log(this.props);
                axios.defaults.headers.common['Authorization'] = JSON.stringify({
                    tokenID:sessionStorage.tokenID,
                    uid:sessionStorage.uid
                })
                this.props.history.push("/");
            }else{
                message.info(res.data.code);
            }

        })
    }
    render(){
        return <div className="loginbox">
            <div className="box">
                <Input size="large" name="userName" value={this.state.userName} onChange={this.handleInput.bind(this)} placeholder="请输入用户名" />
                <Input size="large" name="passWord" value={this.state.passWord} onChange={this.handleInput.bind(this)} placeholder="请输入密码" />
                <Button type="primary" onClick={this.handleClick.bind(this)} size="large">登陆</Button>
            </div>
        </div>
    }
    
}