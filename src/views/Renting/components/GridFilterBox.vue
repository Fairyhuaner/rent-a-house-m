<template>
  <div class="grid-filter-box">
    <!-- 下面复选框绑定是change事件，之所以不用click事件，因为"v-model是同步中的异步，是属于半异步"，优先于click点击事件 原做法,现已删除, (一大段时间后...)不过我还是用到了change，道理一样-->
    <!-- 做复杂了 把v-model绑定在那个复选组上会更简单,而且贼方便，只不过一开始没搞明白...后面懒得改了 (一大段时间后...)后来真香还是改了-->
    <!-- 户型 -->
    <div>
      <h3>户型</h3>
      <div class="van-grid-box">
        <van-grid :border="false" :column-num="2">
          <van-grid-item v-for="(item, index) in roomType" :key="index">
            <van-checkbox-group
              v-model="roomTypeValue"
              @change="moreListChange"
            >
              <van-checkbox
                :name="originalData.roomType[index].value"
                :key="item"
              >
                <template #icon="props">
                  <div
                    class="checkbox"
                    :class="{ checkedStyle: props.checked }"
                  >
                    {{ item }}
                  </div>
                </template>
              </van-checkbox>
            </van-checkbox-group>
          </van-grid-item>
        </van-grid>
      </div>
      <van-divider />
    </div>
    <!-- /户型 -->
    <!-- 朝向 -->
    <div>
      <h3>朝向</h3>
      <div class="van-grid-box">
        <van-grid :border="false" :column-num="2">
          <van-grid-item v-for="(item, index) in oriented" :key="index">
            <van-checkbox-group
              v-model="orientedValue"
              @change="moreListChange"
            >
              <van-checkbox
                :name="originalData.oriented[index].value"
                :key="item"
              >
                <template #icon="props">
                  <div
                    class="checkbox"
                    :class="{ checkedStyle: props.checked }"
                  >
                    {{ item }}
                  </div>
                </template>
              </van-checkbox>
            </van-checkbox-group>
          </van-grid-item>
        </van-grid>
      </div>
      <van-divider />
    </div>
    <!-- /朝向 -->
    <!-- 楼层 -->
    <div>
      <h3>楼层</h3>
      <div class="van-grid-box">
        <van-grid :border="false" :column-num="2">
          <van-grid-item v-for="(item, index) in floor" :key="index">
            <van-checkbox-group v-model="floorValue" @change="moreListChange">
              <van-checkbox :name="originalData.floor[index].value" :key="item">
                <template #icon="props">
                  <div
                    class="checkbox"
                    :class="{ checkedStyle: props.checked }"
                  >
                    {{ item }}
                  </div>
                </template>
              </van-checkbox>
            </van-checkbox-group>
          </van-grid-item>
        </van-grid>
      </div>
      <van-divider />
    </div>
    <!-- /楼层 -->
    <!-- 房屋亮点 -->
    <div class="characteristic-box">
      <h3>房屋亮点</h3>
      <div class="van-grid-box">
        <van-grid :border="false" :column-num="2">
          <van-grid-item v-for="(item, index) in characteristic" :key="index">
            <van-checkbox-group
              v-model="characteristicValue"
              @change="moreListChange"
            >
              <van-checkbox
                :name="originalData.characteristic[index].value"
                :key="item"
              >
                <template #icon="props">
                  <div
                    class="checkbox"
                    :class="{ checkedStyle: props.checked }"
                  >
                    {{ item }}
                  </div>
                </template>
              </van-checkbox>
            </van-checkbox-group>
          </van-grid-item>
        </van-grid>
      </div>
      <van-divider />
    </div>
    <!-- /房屋亮点 -->
  </div>
</template>

<script>
export default {
  name: 'GridFilterBox',
  props: {
    roomType: {
      type: Array,
      required: true
    },
    oriented: {
      type: Array,
      required: true
    },
    floor: {
      type: Array,
      required: true
    },
    characteristic: {
      type: Array,
      required: true
    },
    originalData: {
      type: [Array, Object],
      required: true
    },
    houseQuery: {
      type: [Array, Object],
      required: true
    },
    roomTypeValue: {
      type: Array,
      required: true
    },
    orientedValue: {
      type: Array,
      required: true
    },
    floorValue: {
      type: Array,
      required: true
    },
    characteristicValue: {
      type: Array,
      required: true
    }
  },
  created () {
  },
  data () {
    return {

    }
  },
  methods: {
    moreListChange () {
      this.houseQuery.more = [...this.roomTypeValue, ...this.orientedValue, ...this.floorValue, ...this.characteristicValue].toString()
      this.$emit('update:houseQuery', this.houseQuery)
      this.$emit('update:roomTypeValue', this.roomTypeValue)
      this.$emit('update:orientedValue', this.orientedValue)
      this.$emit('update:floorValue', this.floorValue)
      this.$emit('update:characteristicValue', this.characteristicValue)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
h3 {
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 0;
  margin-left: 30px;
}
// 筛选的选择框
.van-grid-box {
  padding: 0 130px 0 110px;
}
/deep/ .van-grid-item__content {
  padding: 0;
}
.van-checkbox {
  height: 104px;
  width: 180px;
  // line-height: 70px;
}
.checkbox {
  border: 1px solid #dddddd;
  height: 65px;
  width: 150px;
  color: #888888;
  text-align: center;
  line-height: 65px;
  font-size: 28px;
}
// 选中之后的样式
.checkedStyle {
  background-color: #defaef;
  border: 1px solid #21b97a;
  color: #21b9a0;
}
// 分割线
.van-divider {
  color: #d5d5d5;
  border-color: #d5d5d5;
  padding: 0 20px 0 35px;
}
.characteristic-box {
  padding-bottom: 100px;
}
</style>
