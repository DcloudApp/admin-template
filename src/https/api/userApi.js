import request from '@/https/index.js'

/**
 * @desc 获取验证码
 */
export function captcha() {
  return request.post('/v1/site/captcha')
}
/**
 * @desc 登录
 * @params username 用户名
 * @params password  密码
 * @params verify_code  验证码
 */
export function login(data) {
  return request.post('/v1/site/login', data)
}
/**
 * @desc 获取菜单及权限
 */
export function siteInfo() {
  return request.post('/v1/site/info')
}
