import React from "react";
import {isEnter,resume,subject,classList} from "../../../api/index";
import ResumeTable from "../../../components/resumeTable";
import {Pagination,
    Input,
    Select,
    Button,
    Icon
} from "antd";
const Option = Select.Option;

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            list:[],
            subjectList:[],
            classArr:[],
            classSelectVal:"",
            subjectSelectVal:"",
        }
    }
    handleChange=(val,opt)=>{
        console.log(val,opt)
        this.setState({
            classSelectVal:null
        })
        classList({subjectID:val.trim()})
        .then(res=>{
           
            this.setState({
                classArr : res.data.code
            })
        })
    }
    handleClassSelect = (val,opt,ev)=>{
        this.setState({
            classSelectVal:val,
        })
    }
    componentWillMount(){
        isEnter({
            path:"/rankList"
        }).then(()=>{
            resume({
                skip:0,
                limit:8,
            }).then(res=>{
                this.setState({
                    list:res.data.data.list,
                    total:res.data.data.total
                })
            })
            subject().then(res=>{
               
                this.setState({
                    subjectList:res.data.code
                })
            })
        })
    }
    render(){
        return <div>
        <Input placeholder="请输入查询学生姓名"
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
        ></Input>
        <Select placeholder="请选择查询方向" style={{width:"200px"}} onChange={this.handleChange}>
                {this.state.subjectList.map((item,index)=>{
                    return <Option key={index} value={item._id}>{item.subjectName}</Option>
                })}
            </Select>
            <Select placeholder="请选择查询班级" value={this.state.classSelectVal?this.state.classSelectVal:null} onChange={this.handleClassSelect} style={{width:"200px"}} >
                {this.state.classArr.map((item,index)=>{
                    return <Option key={index} value={item._id}>{item.className}</Option>
                })}
            </Select>
        <Button type="primary" icon="search">
            搜索
        </Button>
        <ResumeTable resumeList={this.state.list} isDel={false}></ResumeTable>
        <Pagination defaultCurrent={1} total={this.state.total} defaultPageSize={8} hideOnSinglePage={true} pageSize={8} total={this.state.total} 
            onChange={(page,pageSize)=>{
                resume({
                    skip:(page-1)*pageSize,
                    limit:pageSize
                }).then(res=>{
                    this.setState({            
                        list:res.data.data.list
                    })
                })
            }} />
        </div>
    }
}