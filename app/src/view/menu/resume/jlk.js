import React from "react";
import {isEnter,resume} from "../../../api/index";
import ResumeTable from "../../../components/resumeTable";
import {Pagination} from "antd";
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[]
        }
    }
    componentWillMount(){
        isEnter({
            path:"/rankList"
        }).then(()=>{
            resume({
                skip:0,
                limit:8,
            }).then(res=>{
                console.log(res);
                this.setState({
                    list:res.data.data.list,
                    total:res.data.data.total
                })
            })
        })
    }
    render(){
        return <div>简历库简历
            <a href="http://localhost:8080/resumen/upload_76c0ff282cfd973249d83c242ae6021d.doc">下载</a>
        <ResumeTable resumeList={this.state.list} isDel={false}></ResumeTable>
        <Pagination defaultCurrent={1} total={this.state.total} defaultPageSize={8} hideOnSinglePage={true} pageSize={8} total={this.state.total} 
            onChange={(page,pageSize)=>{
                resume({
                    skip:(page-1)*pageSize,
                    limit:pageSize
                }).then(res=>{
                    // console.log(res.data.data);
                    this.setState({
                        // total:res.data.data.total,
                        list:res.data.data.list
                    })
                })
            }} />
        </div>
    }
}