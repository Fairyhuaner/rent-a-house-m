<template>
  <div class="home-page">
    <!-- 搜索框 -->
    <div class="search">
      <van-nav-bar :border="false">
        <template #left>
          <van-button
            plain
            type="primary"
            class="btn-region"
            @click="$router.push('/city')"
          >
            {{ $store.state.city }}
          </van-button>
        </template>
        <template #title>
          <van-button plain type="primary" class="btn-search">
            <template>
              <van-icon name="search" size="18" class="icon-search" />
            </template>
            请输入小区或地址
          </van-button>
        </template>
        <template #right>
          <van-icon name="location-o" size="18" class="map" />
        </template>
      </van-nav-bar>
    </div>
    <!-- /搜索框 -->
    <!-- 轮播图 -->
    <div class="rolling">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in SwiperImages" :key="index">
          <img
            class="image"
            v-lazy="'http://liufusong.top:8080' + image.imgSrc"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- /轮播图 -->
    <!-- 宫格图 -->
    <van-grid class="nav" :border="false">
      <van-grid-item
        icon="photo-o"
        text="整租"
        @click="$router.push('/renting')"
      />
      <van-grid-item
        icon="photo-o"
        text="合租"
        @click="$router.push('/renting')"
      />
      <van-grid-item icon="photo-o" text="地图找房" />
      <van-grid-item icon="photo-o" text="去出租" />
    </van-grid>
    <!-- /宫格图 -->
    <!-- 租房小组 -->
    <div class="group">
      <van-nav-bar right-text="更多">
        <template #left> <span class="group-title">租房小组</span> </template>
      </van-nav-bar>
      <van-grid
        class="group-item"
        :column-num="2"
        direction="horizontal"
        :gutter="10"
      >
        <van-grid-item v-for="obj in rentingGroupsInfo" :key="obj.id">
          <van-image
            width="50"
            height="50"
            :src="'http://liufusong.top:8080' + obj.imgSrc"
          />
          <div class="grid-text">
            <p>{{ obj.title }}</p>
            <p>{{ obj.desc }}</p>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- /租房小组 -->
  </div>
</template>

<script>
import { getSwiper, getRentingGroups } from '@/api/home'
export default {
  name: 'HomePage',
  created () {
    this.loadSwiper()
    this.getRentingGroups()
  },
  data () {
    return {
      SwiperImages: [],
      rentingGroupsInfo: []
    }
  },
  methods: {
    async loadSwiper () {
      try {
        const { data } = await getSwiper()
        this.SwiperImages = data.body
        // console.log(this.SwiperImages)
      } catch (err) {
        console.log(err)
      }
    },
    async getRentingGroups () {
      try {
        const { data } = await getRentingGroups({
          area: this.$store.state.areaValue
        })
        this.rentingGroupsInfo = data.body
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
.search {
  position: fixed;
  z-index: 1;
  top: 30px;
  left: 50%;
  transform: translate(-50%);
  width: 700px;
  // background-color: #fff;
  .van-nav-bar {
    background-color: #fff !important;
    height: 60px;
  }
  /deep/ .btn-search,
  .btn-region {
    height: 60px;
    color: #333;
    border: 1px solid #fff;
    line-height: 60px;
  }
  .map {
    color: #333;
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
.image {
  width: 100%;
  height: 414px;
  vertical-align: top;
}

.nav {
  height: 250px;
}
.van-nav-bar,
.group {
  padding-bottom: 20px;
  background-color: #f6f5f6;
  .group-title {
    font-weight: 600;
  }
  /deep/.van-nav-bar__text {
    color: #333;
  }
  /deep/ .van-grid-item__content {
    height: 120px;
  }
  .grid-text {
    font-size: 26px !important;
    line-height: 0.5;
  }
  /deep/ .van-grid-item__content {
    justify-content: space-evenly;
  }
}
</style>
