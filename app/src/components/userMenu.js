import React,{Component} from "react";
import { Avatar, Badge,Menu, Dropdown,Icon} from 'antd';
// const menu = (
    
//   );
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    render(){
        return <div>
            {/* <span> */}
            <Dropdown overlay={<Menu>
      <Menu.Item>
        <span>{this.props.user.userName}</span>
      </Menu.Item>
      <Menu.Item>
        <span>{this.props.user.rankName}</span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={()=>{
            sessionStorage.removeItem("tokenID")
            sessionStorage.removeItem("uid");
            console.log(window);
            window.location.href="http://localhost:3000/login";
        }}><Icon type="poweroff" /></span>
      </Menu.Item>
    </Menu>}>

                <Avatar shape="square" icon="user" />
            </Dropdown>
            <span style={{marginLeft:"20px"}}>
                <Avatar shape="square" icon="mail" onClick={()=>{
                    console.log(this)
                }} />   
            </span>
            {/* </span> */}
        </div>
    }
}