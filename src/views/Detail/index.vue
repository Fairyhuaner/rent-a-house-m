<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar :title="houseDetail.community" fixed>
      <template #left>
        <van-icon name="arrow-left" size="18" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- /头部导航 -->
    <!-- 图片 -->
    <div class="image">
      <van-image
        width="100%"
        height="100%"
        :src="'http://liufusong.top:8080' + houseDetail.houseImg[0]"
      />
    </div>
    <!-- /图片 -->
    <!-- 房屋内容 -->
    <div class="title">
      <h3>{{houseDetail.title}}</h3>
      <van-tag
        plain
        type="danger"
        v-for="(tag, index) in houseDetail.tags"
        :key="index"
        >{{ tag }}</van-tag
      >
    </div>
    <!-- /房屋内容 -->
    <!-- 地图 -->
    <!-- /地图 -->
    <!-- 房屋配套 -->
    <!-- /房屋配套 -->
    <!-- 房屋概括 -->
    <!-- /房屋概括 -->
    <!-- 猜你喜欢 -->
    <!-- /猜你喜欢 -->
  </div>
</template>

<script>
import { getHouseDetails } from '@/api/house'
export default {
  created () {
    this.getHouseDetails()
  },
  props: {
    houseCode: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      houseDetail: {}
    }
  },
  methods: {
    async getHouseDetails () {
      try {
        const { data } = await getHouseDetails(this.houseCode)
        this.houseDetail = data.body
        console.log(this.houseDetail)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
// 图片区域
.image {
  margin-top: 90px;
  width: 100%;
  height: 500px;
  overflow: hidden;
}
// 房屋内容
.title {
  padding-left: 30px;
  h3 {
    font-size: 32px;
    font-weight: 400;
    color: #333;
  }
  /deep/ .van-tag--danger.van-tag--plain {
    color: #46c1cf;
    background-color: #e1f5f8;
    margin-right: 15px;
  }
}
</style>
