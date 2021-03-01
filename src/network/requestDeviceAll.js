import {request} from "./request";

export function getAllDevices(start_time='',end_time='') {
  return request({
    method: 'post',
    url: '/queryDeviceInfoAll',
    data:{
      start_time,
      end_time
    }
  })
}
