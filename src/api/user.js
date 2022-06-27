import request from '@/utils/request'

/**
 * 用户登录
 * @param {*} param0
 * @returns promise
 */
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data: {
      username,
      password
    }
  })
}

/**
 * 获取用户信息
 * @returns promise
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/user'
  })
}
