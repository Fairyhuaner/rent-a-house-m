<template>
  <div class="my-page">
    <!-- 已登录 -->
    <div class="header" v-if="user && user.token">
      <div class="bg"></div>
      <div class="my-info">
        <div class="my-myIcon">
          <img
            class="my-avatar"
            :src="'http://liufusong.top:8080' + userInfo.avatar"
            alt="icon"
          />
        </div>
        <div class="my-user">
          <div class="my-name">{{ userInfo.nickname }}</div>
          <div class="my-edit-me">
            <van-button type="primary" size="small" @click="onLogout"
              >退出</van-button
            >
            <p class="me">
              编辑个人资料
              <span><i class="iconfont icon-arrow"></i></span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- /已登录 -->
    <!-- 未登录 -->
    <div class="header" v-else>
      <div class="bg"></div>
      <div class="my-info">
        <div class="my-myIcon">
          <img
            class="my-avatar"
            src="~@/assets/img/profile/avatar.png"
            alt="icon"
          />
        </div>
        <div class="my-user">
          <div class="my-name">游客</div>
          <div class="my-edit">
            <van-button type="primary" size="small" @click="onLogin"
              >去登录</van-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- /未登录 -->
    <!-- 宫格区域 -->
    <van-grid :column-num="3">
      <van-grid-item
        v-for="value in 6"
        :key="value"
        icon="photo-o"
        text="文字"
      />
    </van-grid>
    <!-- /宫格区域 -->
    <div class="ad">
      <img class="ad-img" src="~@/assets/img/profile/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyPage',
  created () {
    this.loadUserInfo()
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    // 去登录
    onLogin () {
      this.$router.push('/login')
    },
    // 去退出
    onLogout () {
      this.$dialog.confirm({
        title: '提示',
        message: '是否确定退出？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
          this.$store.commit('setCity', '北京')
        })
        .catch(() => {
          // on cancel
          console.log('取消退出')
        })
    },
    // 获取用户信息
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.body
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取用户数据失败')
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  min-height: 600px;
  position: relative;
  .bg {
    width: 100%;
    width: 750px;
    height: 382px;
    background: url("~@/assets/img/profile/bg.png") no-repeat center center /
      750px 382px;
  }
  .my-info {
    position: absolute;
    background: #fff;
    width: 75%;
    height: 53%;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 20px 6px #ddd;
    margin: 100px auto 0;
    padding: 0 40px;
    text-align: center;
    font-size: 26px;
    .my-myIcon {
      position: relative;
      transform: translateY(-50%);
      border-radius: 50%;
      width: 140px;
      height: 140px;
      border: 10px solid #f5f5f5;
      display: inline-block;
      box-shadow: 0 4px 4px #bdbdbd;
      .my-avatar {
        width: 100%;
        border-radius: 50%;
      }
    }
    .my-user {
      padding-top: 30px;
      .my-name {
        margin-top: -85px;
        margin-bottom: 12px;
      }
    }
    .my-edit {
      color: #999;
      font-size: 24px;
      margin-top: 38px;
      .van-button {
        border-radius: 10px;
      }
    }
    .my-edit-me {
      color: #999;
      font-size: 24px;
      margin-top: 5px;
      .van-button {
        border-radius: 10px;
      }
      .me {
        padding: 10px 0;
        span {
          transform: rotate(-90deg);
          display: inline-block;
          margin-left: 3px;
        }
      }
    }
  }
}
/deep/.ad {
  text-align: center;
  margin-top: 40px;
  .ad-img {
    width: 92%;
  }
}
</style>
