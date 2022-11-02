<template>
  <div class="order-box">
    <SimpleHeader name="我的订单"></SimpleHeader>
    <NavBar></NavBar>
    <div class="order-item" v-for="(item, index) in orders" :key="index">
      <div class="title">
        <span class="gooder">{{ item.order.gooder }}</span>
        <span class="state">{{ item.order.state }}</span>
      </div>
      <div class="con">
        <div class="img-box">
          <img
            v-for="(img, index) in item.img"
            :key="index"
            :src="img"
            alt=""
          />
        </div>
        <div class="total">
          <div class="price">￥{{ item.price }}</div>
          <div class="num">{{ `共${item.num}件` }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import SimpleHeader from '@/components/SimpleHeader.vue'
import NavBar from '@/components/NavBar.vue'
export default defineComponent({
  name: 'CarVue',
  components: {
    NavBar,
    SimpleHeader
  },
  setup() {
    const store = useStore()
    const state = reactive({
      orders: []
    })

    onMounted(() => {
      const orderList = store.getters.getOrder
      for (const order of orderList) {
        state.orders.push({ order: order })
      }

      for (const x of state.orders) {
        const imgArr = []
        let num = 0
        for (const good of x.order.goods) {
          imgArr.push(good.imgUrl)
          num += good.goodCount
        }
        x.img = imgArr
        x.num = num
        x.price = (33.6 * num).toFixed(1)
      }
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="less">
.order-box {
  background: #f5f5f5;
  padding: 0 18px;
  box-sizing: border-box;

  .order-item {
    margin-top: 16px;
    background: #ffffff;
    border-radius: 4px;
    padding: 16px;
    box-sizing: border-box;
    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;

      .gooder {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        font-weight: 800;
      }

      .state {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #999999;
        text-align: right;
      }
    }
    .con {
      display: flex;
      justify-content: space-between;
      .img-box {
        img {
          width: 40px;
          height: 40px;
          margin-right: 12px;
        }
      }
      .total {
        .price {
          font-family: PingFangSC-Regular;
          font-size: 17px;
          color: #e93b3b;
          text-align: right;
          margin-bottom: 4px;
        }
        .num {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          text-align: right;
          line-height: 14px;
        }
      }
    }
  }
}
</style>
