const jwt = require("jsonwebtoken");
const key = "天王盖地虎";
//签发
// console.log(jwt.sign({id:"123123"},key,{expiresIn:"60s"}))
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// eyJpZCI6IjEyMzEyMyIsImlhdCI6MTU1NzcxNjQxMiwiZXhwIjoxNTU3NzE2NDMyfQ.
// dXcbuxzrrgdIvARXsS7bK-UUhNTMzhjNoem6e3aA6Rg
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// eyJpZCI6IjEyMzEyMyIsImlhdCI6MTU1NzcxNjUwMSwiZXhwIjoxNTU3NzE2NTIxfQ.
// orcpJjx_sov2UVo0eOYkJJ9OEhyesVFsld15dbeTDFw
//认证
// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzEyMyIsImlhdCI6MTU1NzcxNjcwNSwiZXhwIjoxNTU3NzE2NzY1fQ.8Nc2w4ja_Rj1catELjX-zkAFumR19RrP2zi8AgGFmLU";
// jwt.verify(token,key,(err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
    
// })
module.exports = {
    sign(payload,time){
        return jwt.sign(payload,key,{expiresIn:time});
    },
    verify(token,callback){
        jwt.verify(token,key,callback);
    }
}