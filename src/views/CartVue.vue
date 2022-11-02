<template>
  <div class="cart-box">
    <NavBar></NavBar>
    <SimpleHeader name="我的购物车"></SimpleHeader>
    <div class="box">
      <div
        class="good-nav"
        v-for="(item, index) in cart"
        :key="index"
        @click="goTo(item)"
      >
        <div class="good-title">{{ item.gooder }}</div>
        <div class="good-item" v-for="x in item.cart" :key="x.id">
          <img :src="x.imgUrl" alt="" />
          <div class="good-con">
            <div class="name">{{ x.msg }}</div>
            <div class="price">{{ `33.6 * ${x.goodCount}` }}</div>
          </div>
          <div class="allPrice">￥{{ (33.6 * x.goodCount).toFixed(1) }}</div>
        </div>
        <div class="good-total">
          <span>{{ `共计${item.num}件/${0.25 * item.num}kg` }}</span>
          <van-icon name="arrow-down" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import SimpleHeader from '@/components/SimpleHeader.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
export default defineComponent({
  name: 'CarVue',
  components: {
    NavBar,
    SimpleHeader
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      cart: [],
      commit: null,
      list: {
        id: 1,
        goodCount: 1,
        msg: '番茄250g/份',
        checked: true,
        imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnxU1.png',
        gooder: '沃尔玛'
      }
    })

    onMounted(() => {
      for (const x of store.getters.getAllCart) {
        let num = 0
        for (const y of x.cart) {
          num += y.goodCount
        }
        state.cart.push({
          id: x.id,
          gooder: x.cart[0].gooder,
          num: num,
          cart: x.cart
        })
      }
    })

    const goTo = (item) => {
      store.dispatch('commitCart', {
        id: item.id,
        cart: item.cart
      })
      router.push('/address')
    }

    return {
      ...toRefs(state),
      goTo
    }
  }
})
</script>

<style lang="less">
.cart-box {
  .box {
    background: #f5f5f5;
    padding-top: 16px;
    padding-bottom: 50px;
    .good-nav {
      width: 339px;
      background: #ffffff;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      box-sizing: border-box;
      padding: 16px;
      margin: 0 auto;
      margin-bottom: 16px;
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
  }
}
</style>
