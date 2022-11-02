<template>
  <div class="commit-box">
    <SimpleHeader name="确认订单"></SimpleHeader>
    <div class="linear"></div>
    <div class="address-box">
      <div class="address-title">收货地址</div>
      <div class="address" v-for="item in address" :key="item.id">
        <div class="location">{{ item.address }}</div>
        <span class="name">{{ item.name }}</span>
        <span class="tel">{{ item.tel }}</span>
      </div>
      <van-icon name="arrow" class="conlogo" />
    </div>
    <div class="good-nav">
      <div class="good-title">{{ gooder }}</div>
      <div class="good-item" v-for="good in goods" :key="good.id">
        <img :src="good.imgUrl" alt="" />
        <div class="good-con">
          <div class="name">{{ good.msg }}</div>
          <div class="price">{{ `33.6 * ${good.goodCount}` }}</div>
        </div>
        <div class="allPrice">￥{{ (33.6 * good.goodCount).toFixed(1) }}</div>
      </div>
      <div class="good-total">
        <span>{{ `共计${num}件/${0.25 * num}kg` }}</span>
        <van-icon name="arrow-down" />
      </div>
    </div>
    <div class="submit">
      <span class="totalPrice">{{
        `实付金额￥${(33.6 * num).toFixed(1)}`
      }}</span>
      <button type="submit" @click="onSubmit">提交订单</button>
    </div>
    <van-popup
      v-model:show="show"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
      class="toast"
      @click-close-icon="close"
    >
      <template #default>
        <van-icon name="success" />
        <div class="success">支付成功，等待配送</div>
      </template>
    </van-popup>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import SimpleHeader from '@/components/SimpleHeader.vue'
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { Dialog } from 'vant'
export default defineComponent({
  name: 'OrderCommit',
  components: {
    SimpleHeader
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      num: 0,
      show: false,
      address: [],
      goods: null,
      gooder: ''
    })

    const onSubmit = () => {
      Dialog.confirm({
        confirmButtonText: '确认支付',
        cancelButtonText: '取消订单',
        title: '提交订单确认',
        message: '请尽快提交订单，否则订单将被取消'
      })
        .then(() => {
          state.show = true
          const order = {
            gooder: state.gooder,
            state: '已支付',
            goods: state.goods
          }
          store.commit('addOrder', order)
          store.dispatch('deleteCart', store.getters.getCoomitCart)
        })
        .catch(() => {
          const order = {
            gooder: state.gooder,
            state: '已取消',
            goods: state.goods
          }
          store.commit('addOrder', order)
          store.dispatch('deleteCart', store.getters.getCoomitCart)
          router.push('/order')
        })
    }

    onMounted(() => {
      // console.log(store.getters.getCoomitCart)
      state.address.push(store.getters.getAddress)
      state.goods = store.getters.getCoomitCart.cart
      let sum = 0
      for (const x of state.goods) {
        sum += x.goodCount
      }
      state.num = sum
      state.gooder = state.goods[0].gooder
    })

    const close = () => {
      router.push('/order')
    }

    return {
      ...toRefs(state),
      onSubmit,
      close
    }
  }
})
</script>

<style lang="less">
.commit-box {
  background: #f5f5f5;

  .linear {
    background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
    height: 120px;
  }

  .address-box {
    width: 339px;
    height: 111px;
    background: #ffffff;
    border-radius: 4px;
    position: fixed;
    left: 50%;
    top: 95px;
    transform: translate(-170px);
    padding: 16px;
    box-sizing: border-box;

    .address-title {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      font-weight: 800;
      margin-bottom: 14px;
    }

    .location {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      margin-bottom: 6px;
    }

    .name {
      margin-right: 6px;
    }

    .name,
    .tel {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #666666;
    }

    .conlogo {
      position: absolute;
      right: 16px;
      font-size: 25px;
      top: 50%;
      transform: translate(0px, -11px);
    }
  }

  .good-nav {
    position: absolute;
    top: 230px;
    left: 50%;
    width: 339px;
    background: #ffffff;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 16px;
    transform: translate(-170px);

    .good-title {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      font-weight: 800;
    }

    .good-item {
      margin-top: 16px;
      display: flex;
      align-items: center;
      position: relative;

      img {
        width: 46px;
        height: 46px;
      }

      .good-con {
        margin-left: 16px;

        .name {
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          font-weight: 800;
          margin-bottom: 6px;
        }

        .price {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #e93b3b;
        }
      }

      .allPrice {
        position: absolute;
        right: 0;
        bottom: 0;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        font-weight: 500;
        color: #000000;
        text-align: right;
      }
    }

    .good-total {
      margin-top: 16px;
      background: #f5f5f5;
      display: flex;
      height: 28px;
      line-height: 28px;
      align-items: center;
      justify-content: center;

      span {
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #999999;
        line-height: 20px;
        margin-right: 6px;
      }
    }
  }

  .submit {
    height: 49px;
    background: #ffffff;
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 24px;

    .totalPrice {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      text-align: right;
      line-height: 22px;
      font-weight: 600;
    }

    button {
      position: absolute;
      right: 0;
      width: 98px;
      height: 100%;
      border: none;
      background: #4fb0f9;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #ffffff;
      line-height: 20px;
    }
  }

  .toast {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .van-icon {
      font-size: 30px;
      color: #000000;
      margin-bottom: 6px;
    }

    .success {
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #333333;
      font-weight: 800;
    }
  }
}
</style>
