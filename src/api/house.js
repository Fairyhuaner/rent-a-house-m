import request from '@/utils/request'

/**
 * 获取房屋查询条件
 * @param {*} param0
 * @returns
 */
export const getHousesCondition = ({ id }) => {
  return request({
    method: 'GET',
    url: '/houses/condition',
    params: {
      id
    }
  })
}
/**
 * 根据条件查询房屋所需要的各种数据
 * @param {*} cityId 地区的id
 * @param {*} area 地区
 * @param {*} subway 地铁
 * @param {*} rentType 整租
 * @param {*} price 价格
 * @param {*} more 复合查询
 * @param {*} roomType 房屋类型
 * @param {*} oriented 朝向
 * @param {*} characteristic 标签
 * @param {*} floor 楼层
 * @param {*} start 开始项
 * @param {*} end 结束项
 * @returns
 */
export const getHouses = ({ cityId, area, subway, rentType, price, more, roomType, oriented, characteristic, floor, start, end }) => {
  return request({
    method: 'GET',
    url: '/houses',
    params: {
      cityId, area, subway, rentType, price, more, roomType, oriented, characteristic, floor, start, end
    }
  })
}
/**
 * 查询房屋具体信息
 * @param {*} id
 * @returns
 */
export const getHouseDetails = (id) => {
  return request({
    method: 'GET',
    url: `/houses/${id}`
  })
}
