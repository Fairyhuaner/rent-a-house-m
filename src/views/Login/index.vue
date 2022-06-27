<template>
  <div class="login-page">
    <!-- 导航栏 -->
    <van-nav-bar title="账号登录" left-arrow />
    <!-- /导航栏 -->
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field v-model.trim="username" name="name" placeholder="请输入账号" />
      <van-field
        v-model.trim="password"
        type="password"
        name="password"
        placeholder="请输入密码"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- /表单 -->
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginPage',
  created () { },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      if (this.username === '' || this.password === '') return this.$toast('用户名或密码不能为空')
      try {
        const { data } = await login(values)
        console.log(data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败，请稍后重试')
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
.van-form {
  padding-top: 40px;
}
.van-field {
  height: 120px;
  font-size: 34px;
  border-bottom: 1px solid #f1f1f1;
}
.submit {
  background-color: #1cb676;
  height: 100px;
  font-size: 36px;
}
.van-button {
  margin: 60px 0px;
}
</style>
