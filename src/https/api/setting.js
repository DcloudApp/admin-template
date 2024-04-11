import request from '@/https/index.js'

/**
 * @desc 获取菜单列表
 * @params image_file[] 文件file
 * @params type  上传类型
 */
export function menuIndex(data) {
  return request.post('/v1/menu/index', data)
}
