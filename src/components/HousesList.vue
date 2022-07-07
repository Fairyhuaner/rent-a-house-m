<template>
  <div class="HousesList">
    <van-card
      v-for="(item, index) in housesList"
      :key="index"
      :desc="item.desc"
      :title="item.title"
      class="van-card-house"
    >
      <template #thumb>
        <van-image
          width="100"
          height="80"
          :src="'http://liufusong.top:8080' + item.houseImg"
        />
      </template>
      <template #price>
        <span class="price-first">{{ item.price }}</span>
        <span>元/月</span>
      </template>
      <template #tags>
        <van-tag
          plain
          type="danger"
          v-for="(tag, index) in item.tags"
          :key="index"
          >{{ tag }}</van-tag
        >
      </template>
      <template #bottom>
        <!-- 分割线 -->
        <van-divider class="divider" />
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  name: 'HousesListPage',
  created () {
  },
  props: {
    housesList: {
      type: Array,
      required: true
    }
  },
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
/deep/ .van-card__thumb {
  margin-right: 20px;
}
/deep/ .van-card__title {
  font-weight: bold;
  font-size: 30px;
  color: #394043;
}
/deep/ .van-card__desc {
  color: #afb2b3;
  margin: 5px;
}
/deep/ .van-tag--danger.van-tag--plain {
  color: #46c1cf;
  background-color: #e1f5f8;
  margin-right: 15px;
}
.van-card-house {
  position: relative;
}
/deep/ .van-card__bottom {
  position: absolute;
  top: 125px;
  left: 10px;
  .price-first {
    font-weight: 700;
    font-size: 30px;
    padding-right: 5px;
  }
}
.divider {
  color: #d5d5d5;
  border-color: #d5d5d5;
  width: 700px;
  // padding: 0 0 0 5px;
  position: absolute;
  top: 50px;
  left: -230px;
}
</style>
