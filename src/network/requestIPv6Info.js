import {request} from "./requestV6";

export function requestFacility(pageNo,pageSize) {
  return request({
    url:'/list/ipv6facility',
    method: 'post',
    params:{
      pageNo,
      pageSize
    }
  })
}


export function requestServer(pageNo,pageSize) {
  return request({
    url:'/list/ipv6server',
    method: 'post',
    params:{
      pageNo,
      pageSize,
    }
  })
}

export function requestLoc(pageNo, pageSize) {
  return request({
    url: '/list/ipv6loc',
    method: 'post',
    params: {
      pageNo,
      pageSize,
    }
  })
}

/*export function requestGeo(pageNo, pageSize) {
  return request({
    url: '/list/ipv6geo',
    method: 'post',
    params: {
      pageNo,
      pageSize,
    }
  })
}*/

// 文件上传
export function requestFileUpload(file) {
  return request({
    url:'/file/upload',
    method:'post',
    // headers: { 'enctype': 'multipart/form-data' },
    data:{
      file
    }
  })
}
