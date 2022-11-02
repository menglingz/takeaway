<template>
  <div class="categray">
    <div>
      <header class="category-header wrap van=hairline--bottom">
        <i class="nbicon nbfanhui" @click="goHome"></i>
        <div class="header-search">
          <i class="nbicon nbSearch"></i>
          <input type="text" placeholder="山姆会员商店优惠商品" />
        </div>
        <i class="iconfont icon-More"></i>
      </header>
      <div class="good-box">
        <div class="good-item">
          <img :src="gooder.imgUrl" alt="" />
          <div class="good-right">
            <div class="good-title">{{ gooder.title }}</div>
            <div class="good-num">
              <span v-for="spanItem in gooder.spanList" :key="spanItem.id">{{
                spanItem.msg
              }}</span>
            </div>
            <div class="good-bottom">{{ gooder.content }}</div>
          </div>
        </div>
      </div>
      <div class="search-wrap" ref="searchWrap">
        <ListScroll :scrollData="categoryData" class="nav-side-wrapper">
          <ul class="nav-side">
            <li
              v-for="item in categoryData"
              :key="item.categoryId"
              v-text="item.categoryName"
              :class="{ active: currentIndex === item.categoryId }"
              @click="selectMenu(item.categoryId)"
            ></li>
          </ul>
        </ListScroll>
        <div class="search-content">
          <list-scroll :scrollData="categoryData">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <template v-for="(category, index) in categoryData">
                  <div
                    class="swiper-slide"
                    v-if="currentIndex == category.categoryId"
                    :key="index"
                  >
                    <div
                      class="slide-list"
                      v-for="item in category.secondLevelCategoryVOS"
                      :key="item.id"
                    >
                      <img :src="item.imgUrl" alt="" />
                      <div class="slide-right">
                        <div class="title">{{ item.msg }}</div>
                        <div class="sellnum">月售10件</div>
                        <div class="price">
                          <span class="new">33.6</span>
                          <span class="old">¥33.6</span>
                        </div>
                      </div>
                      <div class="btn">
                        <van-icon
                          name="minus"
                          class="reduce"
                          v-if="item.goodCount > 0"
                          @click="reduce(item)"
                        />
                        <span v-if="item.goodCount > 0">{{
                          item.goodCount
                        }}</span>
                        <van-icon name="plus" class="add" @click="add(item)" />
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </list-scroll>
        </div>
      </div>
      <div class="box">
        <div class="cart-logo">
          <van-icon
            name="shopping-cart-o"
            :badge="!count ? '' : count"
            class="logo"
            @click="show = true"
          />
        </div>
        <div class="cart-total">
          <span>购物车是空的</span>
          <van-submit-bar
            v-if="count > 0"
            class="submit-all van-hairline--top"
            :price="total * 100"
            button-text="结算"
            @submit="onSubmit"
          >
          </van-submit-bar>
        </div>
        <div
          class="cart-good"
          :style="{ top: `-${53 + count * 60}px` }"
          v-if="show"
        >
          <div class="car-top">
            <van-checkbox @click="allCheck" v-model="checkAll" class="checkall"
              >全选</van-checkbox
            >
            <span @click="clear">清空购物车</span>
          </div>
          <div class="car-bottom">
            <div class="car-item" v-for="item in carItem" :key="item.id">
              <van-checkbox v-model="item.checked" @click="check" />
              <div class="car-img">
                <img alt="" :src="item.imgUrl" />
              </div>
              <div class="car-con">
                <div class="con-top">{{ item.msg }}</div>
                <div class="con-bottom">
                  <span class="old-con">¥33.6</span>
                  <span class="new-con">¥33.6</span>
                </div>
              </div>
              <div class="car-btn">
                <div class="car-price">
                  ¥{{ (33.6 * item.goodCount).toFixed(1) }}
                </div>
                <van-stepper
                  integer
                  :min="1"
                  :max="30"
                  async-change
                  :name="item"
                  :model-value="item.goodCount"
                  @change="onChange"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <van-overlay
        :show="show"
        @click="show = false"
        :style="{ height: `${671 - (53 + 49 + count * 60)}px` }"
      />
    </div>
  </div>
</template>

<script>
import ListScroll from '@/components/ListScroll.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { defineComponent, reactive, toRefs, ref, computed } from 'vue'
export default defineComponent({
  name: 'GooderDetail',
  components: {
    ListScroll
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const searchWrap = ref(null)
    const router = useRouter()
    const state = reactive({
      gooder: JSON.parse(decodeURIComponent(route.params.gooder)),
      currentIndex: 15,
      count: 0,
      show: false,
      checkAll: false,
      carItem: [],
      categoryData: [
        {
          categoryId: 15,
          categoryLevel: 1,
          categoryName: '全部商品',
          secondLevelCategoryVOS: [
            {
              id: 1,
              goodCount: 0,
              msg: '番茄250g/份',
              checked: false,
              imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnxU1.png'
            },
            {
              id: 2,
              goodCount: 0,
              checked: false,
              msg: '提子250g/份',
              imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnmnb.png'
            },
            {
              id: 3,
              goodCount: 0,
              checked: false,
              msg: '樱桃250g/份',
              imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVns7o.png'
            },
            {
              id: 4,
              goodCount: 0,
              checked: false,
              msg: '苹果250g/份',
              imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVn4BD.png'
            }
          ]
        },
        {
          categoryId: 16,
          categoryLevel: 1,
          categoryName: '秒杀',
          secondLevelCategoryVOS: []
        },
        {
          categoryId: 17,
          categoryLevel: 1,
          categoryName: '新鲜水果',
          secondLevelCategoryVOS: []
        },
        {
          categoryId: 18,
          categoryLevel: 1,
          categoryName: '休闲食品',
          secondLevelCategoryVOS: []
        },
        {
          categoryId: 19,
          categoryLevel: 1,
          categoryName: '时令蔬菜',
          secondLevelCategoryVOS: []
        },
        {
          categoryId: 20,
          categoryLevel: 1,
          categoryName: '肉蛋家禽',
          secondLevelCategoryVOS: []
        }
      ]
    })

    const goHome = () => {
      router.push('/home')
    }

    const selectMenu = (id) => {
      state.currentIndex = id
    }

    const reduce = (item) => {
      item.goodCount--
      if (item.goodCount === 0) {
        state.count--
        state.carItem.splice(state.carItem.indexOf(item), 1)
        item.checked = false
      }
    }

    const add = (item) => {
      if (item.goodCount === 0) {
        state.count++
        state.carItem.push(item)
        item.checked = true
        state.checkAll = true
      }
      item.goodCount++
    }

    const allCheck = () => {
      if (state.checkAll) {
        state.carItem.forEach((item) => (item.checked = true))
      } else {
        state.carItem.forEach((item) => (item.checked = false))
      }
    }

    const check = () => {
      state.checkAll = state.carItem.every((item) => item.checked === true)
    }

    const onChange = (value, detail) => {
      detail.name.goodCount = value
    }

    const total = computed(() => {
      let sum = 0
      const _list = state.carItem.filter((item) => item.checked === true)
      _list.forEach((item) => {
        if (item.checked) {
          sum += item.goodCount * 33.6
        }
      })
      return sum
    })

    const clear = () => {
      // for (let i = 0; i < state.carItem.length; i++) {
      //   state.carItem.pop()
      // }
      // state.count = 0
      console.log(1)
    }

    const getRandom = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const onSubmit = () => {
      for (const good of state.carItem) {
        good.gooder = state.gooder.title
      }
      let id = ''
      for (let i = 0; i < 10; i++) {
        id += getRandom(0, 9)
      }
      store.dispatch('buy', {
        id: id,
        cart: state.carItem
      })
      router.push('/cart')
    }

    return {
      ...toRefs(state),
      goHome,
      searchWrap,
      reduce,
      add,
      selectMenu,
      onChange,
      allCheck,
      check,
      total,
      clear,
      onSubmit
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/common/style/mixin.less';

.categray {
  // .van-overlay {
  //   // background-color: red;
  //   background-color: rgba(0, 0, 0, 0.5);
  // }
  .category-header {
    position: fixed;
    left: 0;
    top: 0;
    .fj();
    .wh(100%, 50px);
    line-height: 50px;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 15px;
    color: #656771;
    z-index: 10000;

    &.active {
      background: @primary;
    }

    .icon-left {
      font-size: 25px;
      font-weight: bold;
    }

    .header-search {
      display: flex;
      width: 80%;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: #f7f7f7;
      border-radius: 20px;

      input {
        display: inline-block;
        height: 100%;
        background: #f7f7f7;
        width: 80%;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #b7b7b7;
        line-height: 16px;
      }

      input::placeholder {
        color: #ccc;
      }

      .nbSearch {
        padding: 0 10px 0 20px;
        font-size: 17px;
      }

      .search-title {
        font-size: 12px;
        color: #666;
        line-height: 21px;
      }
    }

    .icon-More {
      font-size: 20px;
    }
  }

  .good-box {
    padding: 0 15px;
    margin-top: 50px;

    .good-item {
      display: flex;
      align-items: center;
      margin-top: 14px;

      img {
        display: block;
        width: 56px;
        height: 56px;
        margin-right: 16px;
      }

      .good-right {
        display: flex;
        flex-direction: column;

        .good-title {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #333333;
          margin-bottom: 8px;
        }

        .good-num {
          margin-bottom: 8px;

          span {
            font-family: PingFangSC-Regular;
            font-size: 13px;
            color: #333333;
            display: inline-block;
            margin-right: 16px;
          }
        }

        .good-bottom {
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #e93b3b;
        }
      }

      .good-desc {
        text-align: center;
        font-size: 14px;
        padding: 10px 0;

        .title {
          color: #222333;
        }

        .price {
          color: @primary;
        }
      }
    }
  }
}

.search-wrap {
  .fj();
  width: 100%;
  margin-top: 20px;
  background: #f8f8f8;

  .nav-side-wrapper {
    width: 28%;
    height: 100%;
    overflow: hidden;

    .nav-side {
      width: 100%;
      .boxSizing();
      background: #f8f8f8;

      li {
        width: 100%;
        height: 56px;
        text-align: center;
        line-height: 56px;
        font-size: 14px;

        &.active {
          color: @primary;
          background: #fff;
        }
      }
    }
  }

  .search-content {
    width: 72%;
    height: 100%;
    padding: 0 10px;
    background: #fff;
    overflow-y: scroll;
    touch-action: pan-y;

    * {
      touch-action: pan-y;
    }

    .boxSizing();

    .swiper-container {
      width: 100%;

      .slide-list {
        display: flex;
        border-bottom: 2px solid #f1f1f1;
        padding: 12px 0;
        position: relative;

        img {
          width: 68px;
          height: 68px;
        }

        .slide-right {
          margin-left: 16px;

          .title {
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #333333;
            font-weight: 800;
            margin-bottom: 6px;
          }

          .sellnum {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #333333;
            line-height: 16px;
            margin-bottom: 6px;
          }

          .new {
            font-family: PingFangSC-Regular;
            font-size: 17px;
            color: #e93b3b;
            font-weight: 800;
            margin-right: 6px;
          }

          .old {
            font-family: PingFangSC-Regular;
            font-size: 13px;
            color: #999999;
            line-height: 20px;
            text-decoration: line-through;
          }
        }

        .btn {
          position: absolute;
          right: 0;
          bottom: 12px;

          span {
            margin: 0 7px;
          }

          .add {
            background: #0091ff;
            color: white;
            border-radius: 50%;
            font-size: 16px;
          }

          .reduce {
            border-radius: 50%;
            font-size: 16px;
            border: 1px solid #ccc;
          }
        }
      }
    }
  }
}

.box {
  height: 49px;
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;

  .zhezhao {
    position: absolute;
    width: 100%;
    height: 100px;
    background-color: red;
    top: -100px;
  }

  .cart-logo {
    width: 105px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    border-radius: 2px;

    .logo {
      width: 26px;
      height: 26px;
      font-size: 30px;
    }
  }

  .cart-total {
    flex: 1;
    background: border-radius;
    border-radius: 2px;

    span {
      line-height: 49px;
      margin-left: 10px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #333333;
    }

    .van-submit-bar {
      left: 105px;
      width: auto;
    }
  }

  .cart-good {
    position: absolute;
    top: -155px;
    width: 100%;
    background: #ffffff;

    .car-top {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      align-items: center;
      height: 52px;
      border-bottom: 1px solid #f1f1f1;

      .checkall {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        line-height: 16px;
      }

      span {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        text-align: right;
        line-height: 16px;
      }
    }

    .car-bottom {
      padding: 0 10px;
      box-sizing: border-box;

      .car-item {
        display: flex;
        align-items: center;
        height: 60px;

        .car-img {
          width: 46px;
          height: 46px;
          margin-left: 16px;
          margin-right: 16px;

          img {
            width: 46px;
            height: 46px;
          }
        }

        .car-con {
          .con-top {
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #333333;
            margin-bottom: 6px;
            font-weight: 800;
          }

          .con-bottom {
            .old-con {
              font-family: PingFangSC-Regular;
              font-size: 16px;
              color: #e93b3b;
              margin-right: 6px;
            }

            .new-con {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #999999;
              line-height: 20px;
              text-decoration: line-through;
            }
          }
        }

        .car-btn {
          display: flex;
          position: absolute;
          right: 10px;

          .car-price {
            line-height: 28px;
            margin-right: 8px;
          }
        }
      }
    }
  }
}
</style>
