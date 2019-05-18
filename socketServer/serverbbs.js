const ws = require("nodejs-websocket");
const url = require("url");
const qs = require("querystring");
let arr = [];
const server = ws.createServer(conn=>{
    //群聊接口  /all
    //单聊接口  /dan
    const pathname = url.parse(conn.path).pathname;
    const query = qs.parse(url.parse(conn.path).query);
    //判断是否进入群里
    if(pathname == "/all"){
        if(!query.userName){
            console.log(query.userName);
            conn.close();
        }else{
            arr.push(query.userName);
            conn.sendText(`在线人数为：${arr.length}`);
        }   
        conn.on("text",(val)=>{
            console.log(11);
            gb(JSON.stringify({
                userName:query.userName,
                val:val
            }));
        })
    }else if(pathname == "/one"){
        conn.on("text",val=>{
            if(query.toUser&&query.userName){
                server.connections.forEach(conn2=>{
                    const q =  qs.parse(url.parse(conn2.path).query);
                    if(q.userName == query.toUser){
                        conn2.sendText(val);
                    }
                })
            }else{
                conn.close();
            }
        })
    }
})
server.listen(8082,"169.254.64.214");
function gb(val){
    server.connections.forEach(conn=>{
        conn.sendText(val);
    })
}