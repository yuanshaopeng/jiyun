const express = require("express");
const Formidable = require("formidable");
// const fs = require("fs");
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

//文件上传为post请求
router.post("/upload",(req,res)=>{
    //1、实例化表单控件
    let form = new Formidable.IncomingForm();
    //2、设置字符编码
    form.encoding = "utf-8";
    //3、设置上传文件路径
    form.uploadDir = "./resumen";
    //4、是否保留扩展名
    form.keepExtensions = true;
    //5、设置文件的最大上传大小
    form.maxFileSize = 10*1024*1024;//10m;
    //6、监听上传状态
    form.parse(req,(err,option,files)=>{
        if(err){
            console.log(err);
        }else{
            let reg = /\.[a-z]+$/;

            let ext = files.files.path.match(reg)[0];
            // if(ext===".jpg"||ext===".png"||ext===".gif"){

            // }else{
            //     fs.unlink("./"+files.files.path,(err)=>{
            //         console.log(err);
            //     })
            // }
            res.send(files.files.path);
        }
    })
})



module.exports = router;