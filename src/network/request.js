import axios from 'axios'
import store from '../store'
import router from "../router";

 // axios.defaults.withCredentials = true  test111
// 对axios的封装，之后的每个请求都可以用这个封装的方法请求api接口的数据
export function request(config) {
  const instance = axios.create({
     baseURL: "http://203.91.121.228:12864",
    // baseURL: '/api',
     timeout: 5000
  })

  instance.interceptors.request.use(config =>{
    // console.log(process.env.NODE_ENV);
    // console.log(process.env.VUE_APP_BASE_API)
   /* if (config.url !== '/user/login'){
      let token = localStorage.getItem('token')
      if(token){
        config.headers.token = `${token}`
      }else{

        router.push('/login')
      }
    }
    config.headers['Access-Control-Allow-Origin'] = 'http://119.23.29.212:8080'*/
    /* config.headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:8080'
     config.headers['Access-Control-Allow-Credentials'] = 'true'
     config.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'*/

    // 对config进行操作之后要将config返回出去
    /*if(store.state.token){
      config.headers.Authorization = store.state.token
    }*/
    return config
  }, error => {
    console.log(error);
  })

  instance.interceptors.response.use(response=>{
   /* console.log(response.headers['token']);
    localStorage.setItem('token',response.headers['token'])*/
    // 对服务器返回的数据进行操作
   /* return response.data.code === 200 ? response: Promise.reject(response.data.message)*/
    return response
  }, error=> {

    console.log(error);
  })

  return instance(config)
}
