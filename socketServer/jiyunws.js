/**
 * 接收参数：
 * userName:用户名
 * tx:头像地址
 * userID:用户id
 */
const ws = require("nodejs-websocket");
const url = require("url");
const querystring = require("querystring");
let arr = [];
const server = ws.createServer(conn=>{
    
    let pathname = url.parse(conn.path).pathname;
    let query = querystring.parse(url.parse(conn.path).query);
    if(pathname == "/jiyun"){
        if(query.userName&&query.userID&&query.userTx)
        arr.push(query);
        gb(JSON.stringify({
            msgtype:3,
            code:{
                count:arr.length,
                list:arr
            }
        }))
        conn.sendText(JSON.stringify({
            // state:1,
            msgtype:1,
            code:"链接成功"
        }));
        conn.on("text",(val)=>{
            gb(JSON.stringify({
                msgtype:2,
                code:{
                    userName:query.userName,
                    userID:query.userID,
                    msg:val,
                    tx:query.tx
                }
            }))
        })
        conn.on("close",(val)=>{
            arr = arr.filter((item)=>{
                return item.userID !== query.userID
            })
            gb(JSON.stringify({
                msgtype:3,
                code:{
                    count:arr.length,
                    list:arr
                }
            }))
        })
    }else{
        conn.close();
    }
})
server.listen(8083);
function gb(val){
    server.connections.forEach(conn=>{
        conn.sendText(val);
    })
}