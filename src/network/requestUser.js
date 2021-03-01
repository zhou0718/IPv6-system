import {request} from "./request";

// 将所有的网络请求数据写在此处方便管理，如果有多个页面，可以为每个页面写个js文件管理请求数据的方法

export function requestLogin(userName,password) {
   return request({
    /* header:{
       'content-type': 'application/x-www-form-urlencoded'
     },*/
     url: '/user/login',
     method: 'post',
     data:{
        userName,
        password
     }
   })
}

export function requestRegister(username,password,org,email,phone){
  return request({
    url: '/user/register',
    method: 'post',
    data: {
      username,
      password,
      org,
      email,
      phone,
    }
  })
}
export function requestUserList(){
   return request({
     url: '/user/list',
     method: 'post'
   })
}
export function requestUserInfo(username) {
    return request({
      url: '/user/info',
      method: 'post',
      data:{
        username,
      }
    })
}

