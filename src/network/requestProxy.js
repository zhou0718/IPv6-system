import {request} from "./request";

export function requestServerList(){
  return request({
    url: '/server/list',
    method: 'post'
  })
}

