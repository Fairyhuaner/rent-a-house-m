<template>
  <div class="layout-index">
    <router-view />

    <van-tabbar route>
      <van-tabbar-item replace to="/home">
        <div class="icon"><i class="iconfont icon-ind"></i></div>
        <p>首页</p>
      </van-tabbar-item>
      <van-tabbar-item replace to="/find">
        <div class="icon"><i class="iconfont icon-findHouse"></i></div>
        <p>首页</p>
      </van-tabbar-item>
      <van-tabbar-item replace to="/information">
        <div class="icon"><i class="iconfont icon-infom"></i></div>
        <p>首页</p>
      </van-tabbar-item>
      <van-tabbar-item replace to="/my">
        <div class="icon"><i class="iconfont icon-my"></i></div>
        <p>{{ $store.state.user ? "我的" : "未登录" }}</p>
      </van-tabbar-item>
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
.van-tabbar {
  padding-bottom: 15px;
}
.van-tabbar-item {
  flex: 1 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
  .icon {
    display: flex;
    justify-content: center;
    .iconfont {
      font-size: 44px;
    }
  }
  p {
    font-size: 10px;
    margin: 3px px 0 0;
    line-height: 1;
    text-align: center;
  }
}
</style>
