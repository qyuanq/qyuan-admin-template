import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function uploadFileExcel(data) {
  return request({
    url: '/api/updateSmailFile',
    method: 'post',
    data
    // baseURL: 'http://127.0.0.1:7001'
    // onUploadProgress: progress => {
    //   this.uploadProgress = Number(((progress.loaded / progress.total) * 100).toFixed(2))
    // }
  })
}

export function checkfile(data) {
  return request({
    url: '/api/checkfile',
    method: 'post',
    data
  })
}

export function updateFile(data, onUploadProgress) {
  return request({
    url: '/api/updateFile',
    method: 'post',
    data,
    onUploadProgress
  })
}

export function mergeFile(data) {
  return request({
    url: '/api/mergeFile',
    method: 'post',
    data
  })
}

// 下载后端返回文件流
export function download() {
  return request({
    url: '/api/download',
    method: 'post',
    responseType: 'blob'
  })
}
