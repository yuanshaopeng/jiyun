import React from "react";
import Cjyl from "../view/menu/cjyl";
import Cjlr from "../view/menu/cjlr";
import {
    Route,
    Link
} from "react-router-dom";
export default class extends React.Component {
    render(){
        return <div>
            <Link to="/resultpreview">cx</Link>
            <Link to="/resultentering">lr</Link>
            <Route path="/resultpreview" component={Cjyl}></Route>
            <Route path="/resultentering" component={Cjlr}></Route>
        </div>
    }
}