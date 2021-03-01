import {request} from "./request";

export function requestOrderList() {
  return request({
    url: '/addressAP/list',
    method: 'post',
  })
}

export function requestOrderDetail(orderId) {

  return request({
    url: '/addressAP/detail',
    method: 'post',
    data: {
      orderId,
    }
  })
}

export function requestSubmit(domainName,ipList,org,describe) {
  console.log(describe);
  return request({
    url: '/addressAP/submit',
    method: 'post',
    data: {
      domainName,
      ipList,
      org,
      describe,
    }
  })
}
