import request from '@/https/index.js'

/**
 * @desc 获取菜单列表
 */
export function menuIndex(data) {
  return request.post('/v1/menu/index', data)
}
