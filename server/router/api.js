const express = require("express");
const router = express.Router();
const md5 = require("js-md5");
const jwt = require("./jsonwebtoken.js");
const Db = require("./db.js");
const db = new Db("jiyunStudent");
const fs = require("fs");
// fs.readFile("./router/menuList.json","utf-8",(err,data)=>{
//     console.log(data);
//     db.insertMany("menuList",JSON.parse(data),(err,data)=>{
//         console.log("ok")
//     })
// })
router.post("/login",(req,res)=>{
    let qianduan = req.body;
    db.find("userList",{query:qianduan},(err,data)=>{
        console.log(err,data);
        if(err) throw err;
        if(data.length ==0){
            res.send({
                state:"0",
                code:"用户名与密码不匹配"
            })
        }else{
            let id = data[0]._id.toString();
            let token = jwt.sign({id},"7d");
            res.send({
                state:"1",
                code:{
                    uid:id,
                    tokenID:token
                }
            });
        }
        
    })
})



module.exports = router;