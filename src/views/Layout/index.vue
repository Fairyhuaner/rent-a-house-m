<template>
  <div class="layout-index">
    <router-view />

    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/find" icon="search">找房</van-tabbar-item>
      <van-tabbar-item replace to="/information" icon="search"
        >资讯</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="search">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
