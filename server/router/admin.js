const express = require("express");
const router = express.Router();
const jwt = require("./jsonwebtoken.js");
const Db = require("./db.js");
const db = new Db("jiyunStudent");
//在中间件中验证用户身份
router.use((req,res,next)=>{
    let obj = JSON.parse(req.headers.authorization);
    jwt.verify(obj.tokenID,(err,data)=>{
        if(err){
            res.status(401);
            res.send();
        }else{
            let id = data.id;
            if(obj.uid == id){
                next();
            }else{
                res.status(401);
                res.send();
            }

        }
    })
  
})
async function _option(id){
    let step1 = await new Promise((resolve,reject)=>{
        db.find("userOption",{query:{userID:id}},(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data[0]);
            }
        })
    })
    let step2 = await new Promise((resolve,reject)=>{
        db.findById("roleList",step1.rankID,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
    let step3 = await new Promise((resolve,reject)=>{
        db.find("menuList",{},(err,data)=>{
            if(err){
                reject(err);
            }else{
                let menuArr = data.filter((item,index)=>{
                    if(item.children){
                        item.children = item.children.filter((item2,index2)=>{
                            if(item2.children){
                                item2.children = item2.children.filter((item3,index3)=>{
                                    if(item3.rankOpen<=step2.roleRank){
                                        return true
                                    }else{
                                        return false
                                    }
                                })
                            }
                            if(item2.rankOpen<=step2.roleRank){
                                return true
                            }else{
                                return false
                            }
                        })
                    }
                    if(item.rankOpen<=step2.roleRank){
                        return true;
                    }else{
                        return false;
                    }
                })
                resolve(menuArr);
            }
        })
    })
    return [step1,step2,step3];
}

router.get("/option",(req,res)=>{
    let obj = JSON.parse(req.headers.authorization);
    let id = obj.uid;
    _option(id).then(result=>{
        res.send(result)
    })
})

router.post("/isenter",(req,res)=>{
    let path = req.body.path;
    let id = JSON.parse(req.headers.authorization).uid;
    db.find("userOption",{query:{userID:id}},(err,data)=>{
        let userMsg = data[0];
        let rankID = userMsg.rankID;
        db.findById("roleList",rankID,(err,data)=>{
            let rank = data.roleRank;
            db.find("menuList",{},(err,data)=>{
                data.forEach((item,index)=>{
                    if(item.path){
                        if(item.path == path){
                            if(item.rankOpen<=rank){
                                res.send({
                                    state:"1",
                                    code:"success"
                                })
                            }else{
                                res.status(403);
                                res.send("err");
                            }
                        }
                    }else{
                        item.children.forEach((item2,index2)=>{
                            if(item2.path){
                                if(item2.path == path){
                                    if(item2.rankOpen<=rank){
                                        res.send({
                                            state:"1",
                                            code:"success"
                                        })
                                    }else{
                                        res.status(403);
                                        res.send("err");
                                    }
                                }
                            }else{
                                item2.children.forEach((item3,index2)=>{
                                    if(item3.path){
                                        if(item3.path == path){
                                            if(item3.rankOpen<=rank){
                                                res.send({
                                                    state:"1",
                                                    code:"success"
                                                })
                                            }else{
                                                res.status(403);
                                                res.send("err");
                                            }
                                        }
                                    }
                                })
                            }
                        })
                    }
                })
            })
        })
    })
})

//获取科目方向
router.get("/subject",(req,res)=>{
    db.find("subjectList",{},(err,data)=>{
        res.send({
            state:"1",
            code:data
        })
    })
})

//通过科目id获取班级列表
router.get("/classList",(req,res)=>{
    let subjectID = req.query.subjectID;
    db.find("classList",{query:{subjectID}},(err,data)=>{
        res.send({
            state:"1",
            code:data
        })
    })
})
//提交简历接口
router.post("/addResumen",(req,res)=>{
    let userID = JSON.parse(req.headers.authorization).uid;
    let obj = Object.assign(req.body,{userID,uploadTime:new Date().getTime()});
    db.insertOne("resumenList",obj,(err,data)=>{
        res.send({
            state:'1',
            code:"success"
        })
    })
})
//获取个人简历
router.get("/myresume",(req,res)=>{
    let userID = JSON.parse(req.headers.authorization).uid;
    let qianduan = req.query;
    db.find("resumenList",{query:{userID},skip:qianduan.skip*1,limit:qianduan.limit*1},(err,data)=>{
        db.count("resumenList",{userID},(err,count)=>{
            // data.count = count
            res.send({
                state:'1',
                code:"success",
                data:{
                    total:count,
                    list:data
                }
            })
        })
        
    })
})
//获取所有简历
router.get("/resume",(req,res)=>{
    let qianduan = req.query;
    let query = {};
    if(qianduan.studentName){
        query.studentName=qianduan.studentName;
    }
    if(qianduan.classID){
        query.classID=qianduan.classID;
    }
    if(qianduan.subjectID){
        query.subjectID=qianduan.subjectID;
    }
    db.find("resumenList",{
        query,
        skip:qianduan.skip*1,
        limit:qianduan.limit*1
    },(err,data)=>{
        db.count("resumenList",query,(err,count)=>{
            res.send({
                state:'1',
                code:"success",
                data:{
                    total:count,
                    list:data
                }
            })
        })
        
    })
})

module.exports = router;