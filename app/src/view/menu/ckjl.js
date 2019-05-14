import React from "react";
import {isEnter} from "../../api/index";
export default class extends React.Component {
    componentWillMount(){
        isEnter({
            path:"/rankList"
        })
    }
    render(){
        return <div>查看简历</div>
    }
}