const express = require("express");
const api = require("./router/api.js")
const admin = require("./router/admin.js")
const bodyParser = require("body-parser");
const http = express();
http.listen(8080,()=>{
    console.log("server is running");
})
//配置post数据接收转换
http.use(bodyParser.urlencoded({extended:false}));
//开放路由
http.use("/api",api)
//权限路由
http.use("/admin",admin)
