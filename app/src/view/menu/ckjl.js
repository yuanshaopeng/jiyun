import React from "react";
import {isEnter} from "../../api/index";
import {
    NavLink,
    Route,
    Redirect
} from "react-router-dom";
import Grjl from "./resume/grjl";
import Jlk from "./resume/jlk"
export default class extends React.Component {
    componentWillMount(){
        isEnter({
            path:"/rankList"
        })
    }
    render(){
        return <div>
            <NavLink to="/menu/resume/myresume">个人简历</NavLink>
            <NavLink to="/menu/resume/allresume">简历库</NavLink>
            <Route path="/menu/resume" render={()=><Redirect to="/menu/resume/myresume" />} exact={true} />
            <Route path="/menu/resume/myresume" component={Grjl}></Route>
            <Route path="/menu/resume/allresume" component={Jlk}></Route>
        </div>
    }
}