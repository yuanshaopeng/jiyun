import axios from "axios";
import qs from "qs";
//全局配置axios请求头
// axios.defaults.headers.common['Authorization'] = JSON.stringify({
//     tokenID:sessionStorage.tokenID,
//     uid:sessionStorage.uid
// })
axios.interceptors.request.use((config)=>{
    console.log(config);
    config.headers.Authorization = JSON.stringify({
        tokenID:sessionStorage.tokenID,
        uid:sessionStorage.uid
    })
    
    return config
});//请求拦截器
axios.interceptors.response.use(data=>{
    console.log("run 响应拦截器",data);//后台返回数据的操作
    return data;
},err=>{
    let str = err.toString();
    if(str.indexOf("401")>=0){
        window.location.href = "http://localhost:3000/login";
    }else if(str.indexOf("403")>=0){
        window.history.back(-1);
    }
});//响应拦截器

//login登陆接口
export let login = (data)=>{
    return axios({
        method:"post",
        url:"/api/login",
        data:qs.stringify(data)
    })
}
//用户信息及首页导航接口
export let option = ()=>{
    return axios({
        method:"get",
        url:"/admin/option"
    })
}
//验证用户权限是否满足
export let isEnter = (data)=>{
    return axios({
        method:"post",
        url:"/admin/isenter",
        data:qs.stringify(data)
    })
}
