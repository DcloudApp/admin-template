import request from '@/https/index.js'

/**
 * @desc 获取用户列表
 */
export function usersIndex(data) {
  return request.post('/v1/users/index', data)
}
