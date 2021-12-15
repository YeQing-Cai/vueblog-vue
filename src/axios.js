import axios from 'axios'
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css"
import store from "./store";
import router from "./router";

axios.defaults.baseURL="http://127.0.0.1:8081/" // api请求域名或ip端口地址

//前置拦截
axios.interceptors.request.use(config =>{

    return config
})

axios.interceptors.response.use(response =>{
    let res = response.data;
    console.log("---------------")
    console.log(res)
    console.log("---------------")

    
    // 注意这里的code是你接口返回定义的状态码，不是这个http请求自己的状态码
    if(res.code == 200){ // 接口请求返回状态码200，请求正常通过 一般使用===(恒等于)判断
        console.log('ok')
        return response // 抛出返回数据
        // return response.data // 建议直接返回data数据对象
    }else{
        // res.code !== 200的接口请求异常状态，可以分不同状态处理
        //判断密码错误
        console.log('1231231')
        Element.Message({
          message: response.data.msg,
          type: 'error',
          duration: 2 * 1000
        })
        // element组件抛出错误
        //异步消息
        return Promise.reject(response.data.msg)
        // 抛出异常错误
    }

},//error处理情况
// 注意这里错误才是这个http请求自己的错误引起（超时之类）
error =>{
    console.log(error)
    //判断用户不存在
    if(error.response && error.response.data){
        error.message=error.response.data.msg
    }

    if(error.response && error.response.status===401){
        store.commit("REMOVE_USERINFO")
        router.push("/login")//返回登录
    }

    Element.Message.error(error.message,{duration:3*1000})
    return Promise.reject(error)
}


)