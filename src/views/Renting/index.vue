<template>
  <div>
    <!-- 导航栏 -->
    <div class="top">
      <van-nav-bar :border="false" class="search">
        <template #left>
          <van-icon name="arrow-left" size="18" @click="$router.back()" />
        </template>
        <template #title>
          <van-button
            plain
            type="primary"
            class="btn-region"
            @click="$router.push('/city')"
          >
            {{ $store.state.city }}
          </van-button>
          <van-button plain type="primary" class="btn-search">
            <template>
              <van-icon name="search" size="18" class="icon-search" />
            </template>
            请输入小区或地址
          </van-button>
        </template>
        <template #right>
          <van-icon name="location-o" size="18" @click="$router.push('/map')" />
        </template>
      </van-nav-bar>
    </div>
    <!-- /导航栏 -->
    <!-- 增加一个额外的标签 经过测试 还是这个标签靠谱 可以成功获取DOM元素并成功模拟出点击事件 解决两个遮罩层覆盖需要被点击两次的问题-->
    <van-dropdown-menu ref="filterMenu" v-show="false"></van-dropdown-menu>
    <!-- 选择 -->
    <div class="hasFixed">
      <van-dropdown-menu class="total-menu" active-color="#21b97a">
        <!-- 区域 -->
        <van-dropdown-item title="区域" ref="areaDropdown">
          <van-loading
            type="spinner"
            v-show="menuShow"
            style="text-align: center"
          />
          <van-picker
            show-toolbar
            :columns="areaList"
            confirm-button-text="确定"
            toolbar-position="bottom"
            @confirm="onAreaConfirm"
            @cancel="onAreaCancel"
          >
          </van-picker>
        </van-dropdown-item>
        <!-- /区域 -->
        <!-- 方式 -->
        <van-dropdown-item title="方式" ref="typeDropdown">
          <van-loading
            type="spinner"
            v-show="menuShow"
            style="text-align: center"
          />
          <van-picker
            show-toolbar
            :columns="rentType"
            confirm-button-text="确定"
            toolbar-position="bottom"
            @confirm="onTypeConfirm"
            @cancel="onTypeCancel"
          >
          </van-picker>
        </van-dropdown-item>
        <!-- /方式 -->
        <!-- 租金 -->
        <van-dropdown-item title="租金" ref="priceDropdown">
          <van-loading
            type="spinner"
            v-show="menuShow"
            style="text-align: center"
          />
          <van-picker
            show-toolbar
            :columns="price"
            confirm-button-text="确定"
            toolbar-position="bottom"
            @confirm="onPriceConfirm"
            @cancel="onPriceCancel"
          >
          </van-picker>
        </van-dropdown-item>
        <!-- /租金 -->
        <!-- 筛选 -->
        <van-dropdown-item
          id="filter-item"
          title="筛选"
          @open="filterShowPopup"
        >
          <van-popup
            :get-container="getContainer"
            v-model="filterShow"
            position="right"
            :style="{ height: '100%', width: '80%' }"
            @close="filterClosePopup"
            class="filter-popup"
          >
            <!-- 布局 -->
            <GridFilterBox
              :roomType="roomType"
              :oriented="oriented"
              :floor="floor"
              :characteristic="characteristic"
              :originalData="originalData"
              :houseQuery.sync="houseQuery"
              :roomTypeValue.sync="roomTypeValue"
              :orientedValue.sync="orientedValue"
              :floorValue.sync="floorValue"
              :characteristicValue.sync="characteristicValue"
            ></GridFilterBox>
            <van-loading
              type="spinner"
              v-show="menuShow"
              style="text-align: center"
            />
            <!-- 底部按钮 -->
            <div class="footer">
              <div class="van-popup-bottom-button">
                <van-button
                  class="filter-button-cancel"
                  plain
                  type="primary"
                  @click="btnRemove"
                  >清除</van-button
                >
                <van-button
                  class="filter-button-confirm"
                  type="primary"
                  @click="btnConfirm"
                  >确定</van-button
                >
              </div>
            </div>
          </van-popup>
          <!-- /筛选 -->
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <!-- 选择区域 -->
    <!-- 主要内容 -->
    <div class="main-footer">
      <van-loading
        type="spinner"
        v-show="mainShow"
        style="text-align: center"
      />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <HousesList :housesList="housesList"></HousesList>
      </van-list>
      <van-empty description="暂无房源" v-show="housingDateShow" />
    </div>
    <!-- /主要内容 -->
  </div>
</template>

<script>
import { getHouses, getHousesCondition } from '@/api/house'
import HousesList from '@/components/HousesList.vue'
import GridFilterBox from './components/GridFilterBox.vue'

import format from '@/utils'
export default {
  name: 'RentingPage',
  created () {
    this.getHousesCondition()
    this.getHouses(this.houseQuery)
  },
  data () {
    return {
      filterShow: false, // 筛选
      originalData: [], // 查询条件的原始数据
      areaList: [], // 区域和地铁
      rentType: [], // 方式
      price: [], // 价格
      roomType: [], // 户型
      oriented: [], // 朝向
      floor: [], // 楼层
      characteristic: [], // 房屋亮点
      housesList: [], // 每个房屋
      houseQuery: { // 房屋请求的一些参数
        cityId: this.$store.state.areaValue, // 城市id
        area: null, // 地区
        subway: null, // 地铁
        rentType: null, // 整租
        price: null, // 价格
        more: null, // 复合查询
        roomType: null, // 房屋类型
        oriented: null, // 朝向
        characteristic: null, // 标签
        floor: null, // 楼层
        start: 1, // 开始项
        end: 20 // 结束项
      },
      roomTypeValue: [], // 户型的value值
      orientedValue: [], // 朝向的value值
      floorValue: [], // 楼层的value值
      characteristicValue: [], // 房屋亮点的value值
      loading: false, // 往下滑加载
      finished: false, // 没有数据了加载结束
      page: 1, // 页数
      housingDateShow: false, // 暂无房源
      menuShow: false, // 加载一系列选择
      mainShow: false, // 加载主要内容
      needFixed: false, // 顶部状态是否固定
      offsetTop: 0 // 距离顶部距离
    }
  },
  methods: {
    // 打开筛选弹出层
    filterShowPopup () {
      this.filterShow = true
    },
    // 关闭筛选弹出层
    filterClosePopup () {
      // console.log(this.$refs.filterMenu)
      this.$refs.filterMenu.$el.click()
    },
    // 返回一个特定的 DOM 节点，作为筛选弹出层挂载的父节点
    getContainer () {
      return document.querySelector('#filter-item')
    },
    // 获取房屋查询条件
    async getHousesCondition () {
      this.menuShow = true
      try {
        const { data } = await getHousesCondition({
          id: this.$store.state.areaValue
        })
        this.originalData = data.body
        this.areaList.push(format(data.body.area), format(data.body.subway))
        this.filterHousesCondition(data.body.rentType, this.rentType)
        this.filterHousesCondition(data.body.price, this.price)
        this.filterHousesCondition(data.body.roomType, this.roomType)
        this.filterHousesCondition(data.body.oriented, this.oriented)
        this.filterHousesCondition(data.body.floor, this.floor)
        this.filterHousesCondition(data.body.characteristic, this.characteristic)
        // console.log(this.areaList)
        this.menuShow = false
      } catch (err) {
        console.log(err)
      }
    },
    // 简单处理了下上面可以选择的数据
    filterHousesCondition (arr, newArr) {
      arr.forEach(item => newArr.push(item.label))
    },
    // 查询房屋
    async getHouses (houseQuery) {
      this.housingDateShow = false
      this.mainShow = true
      this.finished = false
      try {
        const { data } = await getHouses(houseQuery)
        // console.log(data)
        this.housesList.push(...data.body.list)
        this.loading = false
        if (data.body.list.length === 0) {
          this.finished = true
          this.housingDateShow = true
        }
      } catch (err) {
        console.log(err)
      }
      this.mainShow = false
    },
    // 往下滑加载房屋列表数据
    onLoad () {
      this.page++
      this.houseQuery.end = 20 * this.page
      this.getHouses(this.houseQuery)
    },
    // 筛选房屋 --- 区域 地铁
    onAreaConfirm (value, index) {
      this.$refs.areaDropdown.toggle()
      if (index[0] === 0) {
        if (index[2] === 0) {
          this.houseQuery.area = this.areaList[0].children[index[1]].value
          this.houseQuery.subway = null
        } else {
          this.houseQuery.area = this.areaList[0].children[index[1]].children[index[2]].value
          this.houseQuery.subway = null
        }
      } else {
        if (index[2] === 0) {
          this.houseQuery.subway = this.areaList[1].children[index[1]].value
          this.houseQuery.area = null
        } else {
          this.houseQuery.subway = this.areaList[1].children[index[1]].children[index[2]].value
          this.houseQuery.area = null
        }
      }
      this.page = 1
      this.houseQuery.end = 20 * this.page
      this.housesList = []
      this.getHouses(this.houseQuery)
    },
    onAreaCancel () {
      this.$refs.areaDropdown.toggle()
    },
    // 筛选房屋 --- 方式
    onTypeConfirm (value, index) {
      this.$refs.typeDropdown.toggle()
      if (index === 1) {
        this.houseQuery.rentType = true
      } else if (index === 2) {
        this.houseQuery.rentType = false
      } else {
        this.houseQuery.rentType = null
      }
      this.page = 1
      this.houseQuery.end = 20 * this.page
      this.housesList = []
      this.getHouses(this.houseQuery)
    },
    onTypeCancel () {
      this.$refs.typeDropdown.toggle()
    },
    // 筛选房屋 --- 租金
    onPriceConfirm (value, index) {
      this.$refs.priceDropdown.toggle()
      let pr = ''
      this.originalData.price.forEach(function (item, ind) {
        if (ind === index) {
          pr = item.value
        }
      })
      this.houseQuery.price = pr
      this.page = 1
      this.houseQuery.end = 20 * this.page
      this.housesList = []
      this.getHouses(this.houseQuery)
    },
    onPriceCancel () {
      this.$refs.priceDropdown.toggle()
    },
    // 筛选的确认 --- 各种东西
    btnConfirm () {
      this.page = 1
      this.houseQuery.end = 20 * this.page
      this.housesList = []
      this.getHouses(this.houseQuery)
    },
    // 筛选的清除
    btnRemove () {
      this.roomTypeValue = []
      this.orientedValue = []
      this.floorValue = []
      this.characteristicValue = []
    },
    mounted () {
      // handleScroll为页面滚动的监听回调
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed () {
      // 同时在destroyed回调中移除监听：
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  computed: {},
  watch: {

  },
  filters: {},
  components: { HousesList, GridFilterBox }
}
</script>

<style scoped lang='less'>
.van-nav-bar {
  // position: fixed;
  width: 100%;
}
.top {
  position: relative;
  width: 100%;
  .btn-region {
    position: absolute;
    left: 112px;
    top: 16.8px;
  }
  /deep/ .btn-search,
  .btn-region {
    height: 60px;
    color: #333;
    border: 1px solid #fff;
    line-height: 60px;
  }
  .btn-search {
    position: relative;
    padding-left: 40px;
    color: #9c9fa1;
  }
  .icon-search {
    position: absolute;
    top: 10px;
    left: -5px;
    color: #9c9fa1;
  }
}
// 选择区域
.van-dropdown-menu {
  padding-top: 10px;
}
// 默认的确定与取消样式
/deep/ .grid-filter-box {
  height: 100px;
  line-height: 50px;
}
// 自定义的确定与取消样式
/deep/.van-picker__cancel {
  width: 30%;

  font-size: 36px;
  color: #21b97a;
  border: 1px solid #e9e9e9;
  // line-height: 130px;
}
/deep/ .van-picker__confirm {
  width: 70%;
  // height: 130px;
  font-size: 36px;
  background-color: #21b97a;
  color: #fff;
  // line-height: 130px;
}
// 筛选的确定与取消样式
.footer {
  position: sticky;
  // position: fixed;
  left: 0;
  top: 1235px;
  // top: 100vh;
  width: 100%;
  height: 100px;
}
/deep/ .van-popup-bottom-button {
  display: flex;
  width: 100%;
  height: 100px;
}
.filter-button-cancel {
  width: 30%;
  height: 100px;
  font-size: 36px;
}
.filter-button-confirm {
  width: 70%;
  height: 100px;
  font-size: 36px;
}
// 主要内容的样式
.main-footer {
  // padding-bottom: 100px;
  margin-bottom: 100px;
}
// 吸顶的样式
.hasFixed {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 999;
}
</style>
