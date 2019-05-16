import axios from "axios";
import qs from "qs";
//全局配置axios请求头
// axios.defaults.headers.common['Authorization'] = JSON.stringify({
//     tokenID:sessionStorage.tokenID,
//     uid:sessionStorage.uid
// })
axios.interceptors.request.use((config)=>{
    config.headers.Authorization = JSON.stringify({
        tokenID:sessionStorage.tokenID,
        uid:sessionStorage.uid
    })
    
    return config
});//请求拦截器
axios.interceptors.response.use(data=>{
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
//获取科目列表
export let subject = ()=>{
    return axios({
        method:"get",
        url:"/admin/subject",
    })
}
//获取班级列表
export let classList = (data)=>{
    return axios({
        method:"get",
        url:"/admin/classList",
        params:data
    })
}
//提交简历接口
export let addResumen = (data)=>{
    return axios({
        method:"post",
        url:"/admin/addResumen",
        data:qs.stringify(data)
    })
}
//获取个人简历
export let myResume = (data)=>{
    return axios({
        method:"get",
        params:data,
        url:"/admin/myresume",
    })
}
//获取所有简历
export let resume = (data)=>{
    return axios({
        method:"get",
        params:data,
        url:"/admin/resume",
    })
}