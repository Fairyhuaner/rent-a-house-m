import request from '@/utils/request'

/**
 * 用户登录
 * @param {*} param0
 * @returns promise
 */
export const login = ({ name, password }) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data: {
      name,
      password
    }
  })
}
