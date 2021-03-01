import {request} from "./request";

export function requestWebsiteList(){
  return request({
    url: '/IPv6Info/list',
    method: 'post'
  })
}

export function requestWebsiteInfo(websiteId) {
     return request({
       url: '/IPv6Info/info',
       method: 'post',
       data: {
         websiteId,
       }
     })
}

export function requestUpdate(domainName, status) {
  return request({
    url: '/IPv6Info/update',
    method: 'post',
    data: {
      domainName,
      status
    }
  })
}

export function requestStart(websiteId) {
   return request({
     url: '/IPv6Info/start',
     method: 'post',
     data:{
       websiteId,
     }
   })
}

export function requestStop(websiteId){
  return request({
    url: '/IPv6Info/stop',
    method: 'post',
    data:{
      websiteId,
    }
  })
}
