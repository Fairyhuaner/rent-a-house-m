import request from '@/utils/request'

/**
 * 获取热门城市列表
 * @returns
 */
export const getHotCities = () => {
  return request({
    method: 'GET',
    url: '/area/hot'
  })
}

/**
 * 获取所有城市列表
 * @param {*} param0
 * @returns
 */
export const getAllCities = ({ level }) => {
  return request({
    method: 'GET',
    url: '/area/city',
    params: {
      level
    }
  })
}
