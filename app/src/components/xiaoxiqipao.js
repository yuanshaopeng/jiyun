import React from "react";
import {Avatar} from "antd";
export default (props)=>{
    return <div>
    {props.m?(<div style={{textAlign:"right",padding:"5px 0px"}}><span className="msgQp" 
    style={{
        background:"#87CEFA",
        border:"1px solid #B0C4DE",
        display:"inline-block",
        fontSize:"14px",
        lineHeight:"18px",
        padding:"10px",
        borderRadius:"5px",
        maxWidth:"540px",
        wordBreak:"break-all",
    }}>
        aaa
    </span>
    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    </div>)
    :(<div style={{padding:"5px 0px"}}><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    <span className="msgQp" 
    style={{
        background:"white",
        border:"1px solid #E8E8E8",
        display:"inline-block",
        fontSize:"14px",
        lineHeight:"18px",
        padding:"10px",
        borderRadius:"5px",
        maxWidth:"540px",
        wordBreak:"break-all",
    }}>
    asdasdassssssssssssssadadwdqwjdowaodjasdasljdlasjdljlasjdasdasdassssssssssssssadadwdqwjdowaodjasdasljdlasjdljlasjdasdasdassssssssssssssadadwdqwjdowaodjasdasljdlasjdljlasjdasdasdassssssssssssssadadwdqwjdowaodjasdasljdlasjdljlasjdasdasdassssssssssssssadadwdqwjdowaodjasdasljdlasjdljlasjdasdasdassssssssssssssadadwdqwjdowaodjasdasljdlasjdljlasjd
    </span></div>)
}    
    
    
        
    </div>
}