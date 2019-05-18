import React,{Component} from "react";
import {
    Icon,
    Input,
    Button,
    List, Avatar 
} from "antd";
import "../assets/css/talk.css";
import Qp from "../components/xiaoxiqipao";
const { TextArea } = Input;
const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];
export default class extends Component{
    constructor(props) {
        super(props);
        this.state={
            ...props,
            ws:null,
            msgList:[],
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            isShow:nextProps.isShow,
        })
        if(nextProps.user){
            this.setState({
                user:nextProps.user
            },()=>{
                this.setState({
                    ws:new WebSocket("ws://localhost:8083/jiyun?userName="+this.state.user.userName+"&userID="+this.state.user.userID+"&tx="+this.state.tx)
                })
            })
        }
    }
    
    componentWillUpdate(nextProps,nextState){
        if(nextState.ws!==this.state.ws){
            const that = this;
            nextState.ws.onmessage=function(ev){
                console.log(ev.data);
                // that.setState({
                //     msgList:ev.data
                // })
            }
        }
    }
    render() {
        return <div className="talk" style={{display:this.state.isShow?"block":"none"}} 
        onClick={()=>{
            this.setState({
                isShow:!this.state.isShow
            },()=>{
                this.props.isShowFn(this.state.isShow);
            })
            
        }}>
            <div className="content" onClick={(ev)=>{
                ev.stopPropagation();
            }}>
                <nav className="talkNav">
                    <h3>企业内部交流工具</h3>
                    <Icon type="close" onClick={()=>{
                        this.props.isShowFn(false);
                    }} style={{background:"red",color:"white",width:"45px",height:"45px",fontSize:"30px",textAlign:"center",lineHeight:"44px",position:"absolute",right:0,top:0}} />
                </nav>
                <section>
                    <div className="talkLeft">
                        <div className="talkmsg">
                            <Qp />
                            <Qp m={true} />
                        </div>
                        <div className="talkinput">
                            <TextArea style={{
                                height:"120px",
                                width:"100%",
                                outLine:"none",
                                border:"none"
                            }}/>
                            <Button type="primary" style={{
                                float:"right",
                                marginRight:"30px"
                            }}>发送</Button>
                        </div>
                    </div>
                    <div className="talkRight">
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="在线"
                            />
                        </List.Item>
                        )}
                    />
                    </div>
                </section>
            </div>
        </div>
    }
}