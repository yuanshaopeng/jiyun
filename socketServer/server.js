const ws = require("nodejs-websocket");
const url = require("url");
const querystring = require("querystring");
let arr = [];
const server = ws.createServer((conn)=>{
    console.log("服务已连接");
    console.log(conn.path);
    let urlObj = url.parse(conn.path);
    console.log(urlObj);
    let data = querystring.parse(urlObj.query);
    console.log(data);
    arr.push(data);
    // conn.sendText("我是后台，我主动给你数据，不用求我");
    // // console.log(conn);
    // // console.log(ws)
    // //conn.on("事件名称",callback(val));
    // //监听前端主动提交的数据
    // console.log(server);
    // conn.on("text",function (val) {
    //     console.log(val);
    //     gb(val);
    // })
    
    
})
server.listen(8081);
function gb(val){
    server.connections.forEach((conn)=>{
        conn.sendText(val)
    })
}