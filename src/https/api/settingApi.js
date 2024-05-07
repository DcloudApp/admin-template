import request from '@/https/index.js'

/**
 * @desc 获取菜单列表
 */
export function menuIndex(data) {
  return request.post('/v1/menu/index', data)
}
/**
 * @desc 获取权限列表
 */
export function roleIndex(data) {
  return request.post('/v1/role/index', data)
}
/**
 * @desc 获取角色权限详情
 * id 获取角色权限详情id
 */
export function roleInfo(data) {
  return request.post('/v1/role/info', data)
}

/**
 * @desc 新增或修改角色
 * id 修改角色id
 * name 角色名
 * description 角色描述
 * role_menu 权限数组
 */
export function roleSave(data) {
  return request.post('/v1/role/save', data)
}

/**
 * @desc 删除角色
 * id 删除角色id
 */
export function roleDelete(data) {
  return request.post('/v1/role/delete', data)
}
