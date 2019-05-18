import React from "react";
import {
    Route,
} from "react-router-dom";
import {option} from "../api/index";
import routerConfig from "../router/menuRouter";
// import { Tree } from 'antd';
import { Avatar, Badge,Menu, Dropdown,Icon,Tree} from 'antd';
import "../assets/css/home.css"
// import UserMenu from "../components/userMenu";
import Talk from "../components/talk";
const { TreeNode } = Tree;
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList:[],
            isloding:true,
            isShow:false,
            user:{}
            
        }
        this.handleShow = this.handleShow.bind(this);
    }
    handleShow(bol){
        this.setState({
            isShow:bol
        })
    }
    componentDidMount() {
        option().then(res=>{
            console.log(res);
            this.setState({
                user:{userName:res.data[0].userName,tx:res.data[0].userTx,rankName:res.data[1].roleName},
                menuList:res.data[2],
                isloding:false
            })
        })
    }
   
    handleSelect(key,ev){
        if(key.length>0){
            if(key[0].startsWith("/")){
                let path = key[0];
                this.props.history.push("/menu"+path)
            }
        }
        
    }
    
    render(){
        return <div>{
            !this.state.isloding?
            <div className="homeIndex">
            <Talk ref="talk" isShowFn={this.handleShow} isShow={this.state.isShow} user={
                {
                    userName:this.state.user.userName,
                    tx:this.state.user.userTx,
                    userID:sessionStorage.uid
                }

            }/>
        <header>
            <h1>积云教育学生管理平台</h1>
            <div className="userBox">
                <div>
                {/* <span> */}
                <Dropdown overlay={<Menu>
        <Menu.Item>
            <span>{this.state.user.userName}</span>
        </Menu.Item>
        <Menu.Item>
            <span>{this.state.user.rankName}</span>
        </Menu.Item>
        <Menu.Item>
            <span onClick={()=>{
                sessionStorage.removeItem("tokenID")
                sessionStorage.removeItem("uid");
                window.location.href="http://localhost:3000/login";
            }}><Icon type="poweroff" /></span>
        </Menu.Item>
        </Menu>}>

                    <Avatar shape="square" icon="user" />
                </Dropdown>
                <span style={{marginLeft:"20px"}}>
                    <Avatar shape="square" icon="mail" onClick={()=>{
                        this.handleShow(!this.state.isShow)
                    }} />   
                </span>
                {/* </span> */}
            </div>
            </div>
        </header>
        <section>
            <div className="left">
            <Tree onSelect={this.handleSelect.bind(this)} autoExpandParent={false} showLine={true}>
                {
                    this.state.menuList.map((item,index)=>{
                        return (
                            <TreeNode key={item.path?item.path:index} selectable={item.children?false:true} title={item.menuName}>
                                {
                                    item.children?item.children.map((item2,index2)=>{
                                        return <TreeNode key={item2.path?item2.path:index2} selectable={item2.children?false:true} title={item2.menuName}>
                                            {
                                                item2.children?item2.children.map((item3,index3)=>{
                                                    return <TreeNode key={item3.path?item3.path:index3} selectable={item3.children?false:true} title={item3.menuName} >
                                                        
                                                    </TreeNode>
                                                }):null
                                            }
                                        </TreeNode>
                                    }):null
                                }
                            </TreeNode>
                        )
                    })
                }
            </Tree>
            </div>
            <div className="right">
                {routerConfig.map((item,index)=>{
                    return <Route key={index} path={"/menu"+item.path} component={item.component} exact={item.path==="/"}  ></Route>
                })}
            </div>
        </section>
    </div>:null
    }
    </div>
    }
}