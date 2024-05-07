import request from '@/https/index.js'

/**
 * @desc 获取菜单列表
 */
export function menuIndex(data) {
  return request.post('/v1/menu/index', data)
}
/**
 * @desc 新建或编辑目录 菜单 按钮
 */
export function menuSave(data) {
  return request.post('/v1/menu/save', data)
}
/**
 * @desc 删除目录 菜单 按钮
 * id:目录 菜单 按钮 id
 */
export function menuDelete(data) {
  return request.post('/v1/menu/delete', data)
}

/**
 * @desc 获取角色列表
 */
export function roleIndex(data) {
  return request.post('/v1/role/index', data)
}
/**
 * @desc 获取角色权限详情
 * id:获取角色权限详情id
 */
export function roleInfo(data) {
  return request.post('/v1/role/info', data)
}

/**
 * @desc 新增或修改角色
 * id:修改角色id
 * name:角色名
 * description:角色描述
 * role_menu:权限数组
 */
export function roleSave(data) {
  return request.post('/v1/role/save', data)
}

/**
 * @desc 删除角色
 * id:删除角色id
 */
export function roleDelete(data) {
  return request.post('/v1/role/delete', data)
}

/**
 * @desc 后台用户列表
 * count:总数量
 * page:页数
 * page_size:每页多少条
 * search_username:搜索用户名
 * search_email:搜索邮箱
 * role:权限分类搜索
 */
export function adminIndex(data) {
  return request.post('/v1/admin/index', data)
}
/**
 * @desc 获取所有角色
 */
export function roleGetAll(data) {
  return request.post('/v1/role/get-all', data)
}
