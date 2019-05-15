import React from "react";
import {
    isEnter,
    subject,
    classList,
    addResumen
} from "../../api/index";
import { 
    Input,
    Select,
    Upload, 
    Icon, 
    message,
    Button
} from 'antd';
const Option = Select.Option;
const Dragger = Upload.Dragger;
export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            subjectList:[],
            classArr:[],
            classSelectVal:null,
            resumenObj:{},
            isSend:false
        }
    }
    componentWillMount(){
        isEnter({
            path:"/rankList"
        }).then(res=>{
            subject().then(res=>{
                console.log(res);
                this.setState({
                    subjectList:res.data.code
                })
            })
        })
    }
    handleInputChange = (ev)=>{
        this.setState( {
            resumenObj:Object.assign(this.state.resumenObj,{studentName:ev.target.value})
        })
    }
    handleChange=(val,opt)=>{
        console.log(val,opt)
        this.setState({
            resumenObj:Object.assign(this.state.resumenObj,{subjectID:val,subjectName:opt.props.children}),
            classSelectVal:null
        })
        classList({subjectID:val.trim()})
        .then(res=>{
            console.log(res);
            this.setState({
                classArr : res.data.code
            })
        })
    }
    handleClassSelect = (val,opt,ev)=>{
        console.log(val,opt,ev);
        this.setState({
            classSelectVal:val,
            resumenObj:Object.assign(this.state.resumenObj,{classID:val,className:opt.props.children})
        })
    }
    handleBeforeUpload = (file,filelist)=>{
        console.log(file);
        let reg = /\.[a-z]+$/;

        let ext = file.name.match(reg)[0];
        return ext===".doc" || ext ===".docx" || ext===".pdf";
        // return false
    }
    hanldeUploadChange = (file,filelist,ev)=>{
        console.log(file,ev);
        let url ="http://localhost:8080/"+file.file.response;
        this.setState({
            resumenObj:Object.assign(this.state.resumenObj,{url,size:file.file.size})
        },()=>{
            this.setState({
                isSend:this.state.resumenObj.hasOwnProperty("studentName")&&
                this.state.resumenObj.hasOwnProperty("subjectID")&&
                this.state.resumenObj.hasOwnProperty("classID")&&
                this.state.resumenObj.hasOwnProperty("url")&&
                this.state.resumenObj.hasOwnProperty("size")&&
                this.state.resumenObj.hasOwnProperty("subjectName")&&
                this.state.resumenObj.hasOwnProperty("className")
            })
        })
    }
    handleAddResumen = ()=>{
        console.log(this.state.resumenObj);
        addResumen(this.state.resumenObj)
        .then(res=>{
            console.log(res);
        })
    }
    render(){
        return <div>
            <Input type="text" placeholder="请输入姓名" onChange={this.handleInputChange} ></Input><br/>
            <Select placeholder="请选择学习方向" style={{width:"200px"}} onChange={this.handleChange}>
                {this.state.subjectList.map((item,index)=>{
                    return <Option key={index} value={item._id}>{item.subjectName}</Option>
                })}
            </Select>
            <Select placeholder="请选择班级名称" value={this.state.classSelectVal} onChange={this.handleClassSelect} style={{width:"200px"}} >
                {this.state.classArr.map((item,index)=>{
                    return <Option key={index} value={item._id}>{item.className}</Option>
                })}
            </Select>
            {/* <Input type="text" placeholder="请输入"></Input> */}
            {/* 求职方向 */}
            <Dragger 
                action="/api/upload"
                name="files"
                beforeUpload={this.handleBeforeUpload}
                onChange={this.hanldeUploadChange}
            >
                <p>请将需要上传的简历附件拖拽至文本框,仅支持.doc .docx .pdf</p>
            </Dragger>
            <Button type="primary" disabled={!this.state.isSend} onClick={this.handleAddResumen}>Primary</Button>
        </div>
    }
}