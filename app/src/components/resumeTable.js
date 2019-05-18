import {Table} from "antd";
import React from "react";

export default class extends React.Component {
    componentWillReceiveProps(nextProps){
        this.setState({
            resumeList:nextProps.resumeList
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            resumeList:props.resumeList,
            columns:[
                {
                  title: '学生姓名',
                  dataIndex: 'studentName',
                  key: 'studentName',
                },
                {
                  title: '班级',
                  dataIndex: 'className',
                  key: 'className',
                },
                {
                  title: '专业',
                  dataIndex: 'subjectName',
                  key: 'subjectName',
                },
                {
                    title:"上传时间",
                    dataIndex:"uploadTime",
                    key:"uploadTime",
                    render(t,item,index){
                        let d = new Date(t*1);
                        
                        return <span>
                            {
                                d.getFullYear()+"/"+
                                ((d.getMonth()+1)<=9?"0"+(d.getMonth()+1):(d.getMonth()+1))
                                +"/"+
                                (d.getDate()<=9?"0"+d.getDate():d.getDate())
                                +" "+
                                (d.getHours()<=9?"0"+d.getHours():d.getHours())
                                +":"+                
                                (d.getMinutes()<=9?"0"+d.getMinutes():d.getMinutes())
                                +":"+
                                (d.getSeconds()<=9?"0"+d.getSeconds():d.getSeconds())
                                
                            }
                        </span>
                    }
                },{
                    title:"操作",
                    dataIndex:"url",
                    key:"_id",
                    render(url,item,index){
                        // console.log(url,b,c)
                        return <span >
                            {props.isDel?<a href="#" >删除</a>:null}
                            <a href={url} >下载</a>
                        </span>
                    }
                }
              ]
        }
    }
    render(){
        
        return <div> 
            <Table columns={this.state.columns} pagination={false} dataSource={this.state.resumeList}></Table>
         </div>
    }


}