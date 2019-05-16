import React from "react";
import {
    Route,
} from "react-router-dom";
import {option} from "../api/index";
import routerConfig from "../router/menuRouter";
import { Tree } from 'antd';
import "../assets/css/home.css"
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
            this.setState({
                menuList:res.data[2]
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
        return <div className="homeIndex">
        <header>
            <h1>积云教育学生管理平台</h1>
            <div>
                
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
    </div>
    }
}