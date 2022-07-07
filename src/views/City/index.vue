<template>
  <div class="city-page">
    <!-- 头部导航 -->
    <van-nav-bar title="城市列表">
      <template #left>
        <van-icon name="arrow-left" size="18" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- /头部导航 -->
    <van-index-bar :index-list="indexChars" :sticky="false" class="main">
      <!-- 当前城市 -->
      <div>
        <van-index-anchor index="#">当前城市</van-index-anchor>
        <van-cell :title="theCurrentCity" />
      </div>
      <!-- /当前城市 -->
      <!-- 热门城市 -->
      <div>
        <van-index-anchor index="热">热门城市</van-index-anchor>
        <van-cell
          v-for="(item, index) in hotCities"
          :key="index"
          :title="item.label"
          @click="onCityClick(item.label, item.value)"
        />
      </div>
      <!-- /热门城市 -->
      <!-- 所有城市 -->
      <!-- v-for同时循环一个对象和数组 -->
      <!-- 详细链接 https://www.cnblogs.com/a-pupil/p/10788869.html -->
      <div v-for="(cities, letter, index) in allCitiesList" :key="letter">
        <van-index-anchor :index="letters[index]">{{
          letters[index]
        }}</van-index-anchor>
        <van-cell
          v-for="(item, ind) in allCitiesList[letters[index]]"
          :key="ind"
          @click="onCityClick(item.label, item.value)"
        >
          {{ item.label }}
        </van-cell>
      </div>
    </van-index-bar>
    <!-- /所有城市 -->
  </div>
</template>

<script>
import { getAllCities, getHotCities } from '@/api/area'
export default {
  name: 'CityPage',
  created () {
    this.getHotCities()
    this.getAllCities()
    // console.log('created', this.allCitiesList)
    // console.log(this.letters)
  },
  data () {
    return {
      level: 1, // 获取哪一级的城市，1 表示获取所有城市数据 2 表示城市下区的数据
      hotCities: [], // 热门城市
      allCities: [], // 未分类的城市
      allCitiesList: {}, // 已分类的城市
      letters: [], // 城市首字母
      indexChars: ['#', '热'], // 索引字符列表
      theCurrentCity: '北京' // 当前城市
    }
  },
  methods: {
    async getHotCities () {
      try {
        const { data } = await getHotCities()
        this.hotCities = data.body
      } catch (err) {
        console.log(err)
      }
    },
    async getAllCities () {
      try {
        const { data } = await getAllCities({
          level: this.level
        })
        this.allCities = data.body
        data.body.forEach(item => {
          // JS获取对象键值对中key值的方法
          // Object.keys() 会返回一个数组，数组中是这个对象的key值列表
          // 所以只要Object.keys(a)[0]， 就可以得只包含一个键值对的key值
          // 详细链接 https://blog.csdn.net/qq_37746973/article/details/80297150
          const key = Object.keys(this.transform(item.short, item))[0].toUpperCase()
          if (this.allCitiesList[key]) {
            this.allCitiesList[key].push(item)
          } else {
            this.allCitiesList[key] = [item]
            this.letters.push(key)
          }
        })
        this.letters.sort()
        this.indexChars.push(...this.letters)
        // console.log(this.allCitiesList)
      } catch (err) {
        console.log(err)
      }
    },
    // 截取首字母
    // 将字符串处理首字母相同放在一起
    // 详细链接 https://blog.csdn.net/liangxhblog/article/details/81809550
    transform (str, item) {
      const obj = {}
      const charKey = str[0]
      if (obj[charKey]) {
        obj[charKey].push(item)
      } else {
        obj[charKey] = [item]
      }
      // console.log(obj)
      return obj
    },
    onCityClick (city, value) {
      this.theCurrentCity = city
      this.$store.commit('setCity', city)
      this.$store.commit('setAreaValue', value)
      this.$router.back()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-nav-bar {
  position: fixed;
  width: 100%;
}
.main {
  padding-top: 100px;
  /deep/ .van-index-anchor {
    color: #a2a2a2;
    font-size: 28px;
  }
}
</style>
