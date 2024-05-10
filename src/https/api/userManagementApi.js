import request from '@/https/index.js'

/**
 * @desc 获取用户列表
 */
export function usersIndex(data) {
  return request.post('/v1/users/index', data)
}

/**
 * @desc 上传头像
 * type:上传类型
 * files:上传文件
 */
export function filesUpload(data, config = { headers: { 'Content-Type': 'multipart/form-data' } }) {
  return request.post('/v1/files/upload', data, config)
}
/**
 * @desc 新建编辑用户
 *
 */
export function usersSave(data) {
  return request.post('/v1/users/save', data)
}
/**
 * @desc 删除用户
 * guid:删除用户的guid
 */
export function usersDelete(data) {
  return request.post('/v1/users/delete', data)
}
