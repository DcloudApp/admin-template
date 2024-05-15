import request from '@/https/index.js'

/**
 * @desc 获取版本信息列表
 */
export function versionsIndex(data) {
  return request.post('/v1/versions/index', data)
}
/**
 * @desc 新建版本信息
 * version:版本号
 * device_type:设备类型
 * status:状态
 * force_update_message:强制更新的内容
 * update_message:更新的内容
 */
export function versionsCreate(data) {
  return request.post('/v1/versions/create', data)
}

/**
 * @desc 编辑版本信息
 * id:编辑版本信息id
 * version:版本号
 * device_type:设备类型
 * status:状态
 * force_update_message:强制更新的内容
 * update_message:更新的内容
 */
export function versionsEdit(data) {
  return request.post('/v1/versions/edit', data)
}

/**
 * @desc 发送私信
 * sender_guid:发送的唯一标识符
 * guid:接受的唯一标识符
 * content:发送的内容
 */
export function usersPrivateMsg(data) {
  return request.post('/v1/users/private-msg', data)
}

/**
 * @desc 向部分用户推送feed的onesignal消息
 * feed_id:发送的唯一标识符
 * feed_title:接受的唯一标识符
 * feed_content:发送的内容
 * user:收到用户的guid
 */
export function onesignalFeed(data) {
  return request.post('/v1/onesignal/feed', data)
}
