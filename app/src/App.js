import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect //路由重定向
} from 'react-router-dom'
import login from "./view/login";
import home from "./view/home"
import demo from "./view/demo"
import "./assets/css/app.css"
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact={true} render={()=>{
          //进行路由重定向
          return <Redirect to="/menu" ></Redirect> 
        }} ></Route>
        
        <Route path="/menu" component={home}></Route>
        <Route path="/login" component={login}></Route>
      </Router>
    </div>
  );
}

export default App;
