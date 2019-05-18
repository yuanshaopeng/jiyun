import React from "react";
import {isEnter} from "../../api/index";
import {
    NavLink,
    Route,
    Redirect
} from "react-router-dom";
import Grjl from "./resume/grjl";
import Jlk from "./resume/jlk"
import {Button} from "antd";
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enterWhat:0,
        }
    }
    componentWillMount(){
        isEnter({
            path:"/rankList"
        })
    }
    render(){
        return <div>
            <Button type={this.state.enterWhat===1?"default":"primary"} onClick={()=>{
                this.setState({
                    enterWhat:0
                })
            }}>
            <NavLink to="/menu/resume/myresume">个人简历</NavLink>
            </Button>
            <Button type={this.state.enterWhat===0?"default":"primary"} onClick={()=>{
                this.setState({
                    enterWhat:1
                })
            }}>
            <NavLink to="/menu/resume/allresume">简历库</NavLink>
            </Button>
            <Route path="/menu/resume" render={()=><Redirect to="/menu/resume/myresume" />} exact={true} />
            <Route path="/menu/resume/myresume" component={Grjl}></Route>
            <Route path="/menu/resume/allresume" component={Jlk}></Route>
        </div>
    }
}