import request from '@/https/index.js'

/**
 * @desc 获取版本列表
 */
export function versionsIndex(data) {
  return request.post('/v1/versions/index', data)
}
