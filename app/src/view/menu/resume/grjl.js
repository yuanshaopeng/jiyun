import React from "react";
import {isEnter,myResume} from "../../../api/index";
import ResumeTable from "../../../components/resumeTable";
import {Pagination} from "antd";
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {resumeList:[]};
    }
    componentWillMount(){
        isEnter({
            path:"/rankList"
        })
        .then(()=>{
            myResume({
                skip:0,
                limit:8
            }).then(res=>{
                console.log(res.data.data);
                this.setState({
                    total:res.data.data.total,
                    resumeList:res.data.data.list
                })
            })
        })

    }
    render(){
        return <div>个人简历
            <ResumeTable resumeList={this.state.resumeList} isDel={true} />
            <Pagination defaultCurrent={1} total={50} defaultPageSize={8} hideOnSinglePage={true} pageSize={8} total={this.state.total} 
            onChange={(page,pageSize)=>{
                myResume({
                    skip:(page-1)*pageSize,
                    limit:pageSize
                }).then(res=>{
                    // console.log(res.data.data);
                    this.setState({
                        // total:res.data.data.total,
                        resumeList:res.data.data.list
                    })
                })
            }} />
        </div>
    }
}