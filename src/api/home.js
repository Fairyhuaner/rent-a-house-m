import request from '@/utils/request'

/**
 * 获取首页轮播图
 * @returns
 */
export const getSwiper = () => {
  return request({
    method: 'GET',
    url: '/home/swiper'
  })
}

export const getRentingGroups = ({ area }) => {
  return request({
    method: 'GET',
    url: '/home/groups',
    params: {
      area
    }
  })
}
