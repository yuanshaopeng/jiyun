import React from "react";
import {
    Route,
} from "react-router-dom";
import {option} from "../api/index";
import routerConfig from "../router/menuRouter";
import { Tree } from 'antd';
const { TreeNode } = Tree;
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList:[],
            
        }
    }

    componentDidMount() {
        option().then(res=>{
            console.log(res);
            this.setState({
                menuList:res.data[2]
            })
        })
        //如果身份验证有误，则跳转至登陆页
        .catch(err=>{
            // console.log(err);
            // this.props.history.push("/login")
        })
    }
    beforeEnter(a,b){
        console.log(a,b)
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
        return <div>
        <header>
            <h1>积云教育学生管理平台</h1>
            <div>

            </div>
        </header>
        <section>
            <div className="left">
            <Tree onSelect={this.handleSelect.bind(this)}>
                {
                    this.state.menuList.map((item,index)=>{
                        return (
                            <TreeNode key={item.path?item.path:index} title={item.menuName}>
                                {
                                    item.children?item.children.map((item2,index2)=>{
                                        return <TreeNode key={item2.path?item2.path:index2} title={item2.menuName}>
                                            {
                                                item2.children?item2.children.map((item3,index3)=>{
                                                    return <TreeNode key={item3.path?item3.path:index3} title={item3.menuName} >
                                                        
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
    </div>
    }
}