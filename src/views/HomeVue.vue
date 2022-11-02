<!-- eslint-disable vue/no-deprecated-router-link-tag-prop -->
<template>
  <div>
    <header class="home-header wrap" :class="{ active: headerScroll }">
      <router-link tag="i" to="./home">
        <i class="nbicon nbmenu2"></i>
      </router-link>
      <div class="header-search">
        <span class="app-name">北京理工大学国防科技园2号楼10层</span>
      </div>
      <router-link class="login" tag="span" to="./login" v-if="!isLogin">登录</router-link>
      <router-link class="login" tag="span" to="./user" v-else>
        <van-icon name="manager-o" />
      </router-link>
    </header>
    <NavBar></NavBar>
    <div class="header-search">
      <i class="nbicon nbSearch"></i>
      <input type="text" placeholder="山姆会员商店优惠商品" @focus="onFocus" />
    </div>
    <div class="home-img">
      <img src="../assets/11.webp" alt="" />
    </div>
    <div class="category-list">
      <div v-for="item in list" :key="item.id" @click="tips">
        <img :src="item.location" />
        <span>{{ item.msg }}</span>
      </div>
    </div>
    <div class="good">
      <header class="good-header">附近店铺</header>
      <van-skeleton title :row="3" :loading="loading">
        <div class="good-box">
          <div class="good-item" v-for="item in goodList" :key="item.id" @click="goTo(item)">
            <img :src="item.imgUrl" alt="" />
            <div class="good-right">
              <div class="good-title">{{ item.title }}</div>
              <div class="good-num">
                <span v-for="spanItem in item.spanList" :key="spanItem.id">{{
                    spanItem.msg
                }}</span>
              </div>
              <div class="good-bottom">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </van-skeleton>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, nextTick, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'HomeVue',
  components: {
    NavBar
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      loading: true,
      list: [
        {
          id: 1,
          msg: '超市便利',
          location: 'https://www.helloimg.com/images/2022/10/28/ZVnxU1.png'
        },
        {
          id: 2,
          msg: '菜市场',
          location: 'https://www.helloimg.com/images/2022/10/28/ZVnmnb.png'
        },
        {
          id: 3,
          msg: '水果店',
          location: 'https://www.helloimg.com/images/2022/10/28/ZVns7o.png'
        },
        {
          id: 4,
          msg: '鲜花绿植',
          location: 'https://www.helloimg.com/images/2022/10/28/ZVn4BD.png'
        },
        {
          id: 5,
          msg: '医药健康',
          location: 'https://www.helloimg.com/images/2022/10/28/ZVnLwC.png'
        },
        {
          id: 6,
          msg: '家居时尚',
          location: 'https://www.helloimg.com/images/2022/10/28/ZVnSfQ.png'
        },
        {
          id: 7,
          msg: '烘焙蛋糕',
          location: 'https://www.helloimg.com/images/2022/10/28/ZVnnqt.png'
        },
        {
          id: 8,
          msg: '签到',
          location: 'https://www.helloimg.com/images/2022/10/28/ZVnHTu.png'
        },
        {
          id: 9,
          msg: '大牌兔运',
          location: 'https://www.helloimg.com/images/2022/10/28/ZVnbUv.png'
        },
        {
          id: 10,
          msg: '红包套餐',
          location: 'https://www.helloimg.com/images/2022/10/28/ZVnMPE.png'
        }
      ],
      isLogin: false,
      headerScroll: false,
      swiperList: [
        {
          carouselUrl:
            'https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner-p50-pocket.png',
          redirectUrl: 'https://juejin.im/book/6844733826191589390'
        },
        {
          carouselUrl:
            'https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner-iphone13.png',
          redirectUrl: 'https://juejin.im/book/6844733826191589390'
        },
        {
          carouselUrl:
            'https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner-mate40.png',
          redirectUrl: 'https://juejin.im/book/6844733826191589390'
        }
      ],
      goodList: [
        {
          id: 1,
          imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnxU1.png',
          title: '沃尔玛',
          spanList: [
            {
              id: 1,
              msg: '月售1万+'
            },
            {
              id: 2,
              msg: '起送¥0'
            },
            {
              id: 3,
              msg: '基础运费¥5'
            }
          ],
          content: 'VIP尊享满89元减4元运费券（每月3张）'
        },
        {
          id: 2,
          imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnmnb.png',
          title: '山姆会员商店',
          spanList: [
            {
              id: 1,
              msg: '月售2千+'
            },
            {
              id: 2,
              msg: '起送¥0'
            },
            {
              id: 3,
              msg: '基础运费¥5'
            }
          ],
          content: '联合利华洗护满10减5'
        },
        {
          id: 3,
          imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnxU1.png',
          title: '沃尔玛',
          spanList: [
            {
              id: 1,
              msg: '月售1万+'
            },
            {
              id: 2,
              msg: '起送¥0'
            },
            {
              id: 3,
              msg: '基础运费¥5'
            }
          ],
          content: 'VIP尊享满89元减4元运费券（每月3张）'
        },
        {
          id: 4,
          imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnmnb.png',
          title: '山姆会员商店',
          spanList: [
            {
              id: 1,
              msg: '月售2千+'
            },
            {
              id: 2,
              msg: '起送¥0'
            },
            {
              id: 3,
              msg: '基础运费¥5'
            }
          ],
          content: '联合利华洗护满10减5'
        }
      ]
    })

    onMounted(async () => {
      // console.log(store.getters.isLogin.valueOf() === false)
      if (store.getters.isLogin === 'false') {
        state.isLogin = false
      } else if (store.getters.isLogin === 'true') {
        state.isLogin = true
      }
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      const { data } = await new Promise((resolve) =>
        setTimeout(() => resolve({ data: false }), 1000)
      )
      state.loading = data
      Toast.clear()
    })

    const goTo = (item) => {
      router.push({
        name: 'gooder-detail',
        params: { gooder: encodeURIComponent(JSON.stringify(item)) }
      })
    }

    const onFocus = () => {
      router.push('/search')
    }

    nextTick(() => {
      window.addEventListener('scroll', () => {
        const scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
        scrollTop > 100
          ? (state.headerScroll = true)
          : (state.headerScroll = false)
      })
    })

    const tips = () => {
      Toast('敬请期待')
    }

    return {
      ...toRefs(state),
      tips,
      goTo,
      onFocus
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/common/style/mixin.less';

.home-header {
  position: fixed;
  left: 0;
  top: 0;
  .wh(100%, 50px);
  .fj();
  line-height: 50px;
  padding: 0 15px;
  .boxSizing();
  font-size: 15px;
  color: #fff;
  z-index: 10000;

  .nbmenu2 {
    color: black;
    margin-left: 9px;
    font-size: 14px;
    line-height: 22px;
  }

  &.active {
    background: @primary;

    .nbmenu2 {
      color: #fff;
    }

    .login {
      color: #fff;
    }
  }

  .header-search {
    display: flex;
    .wh(74%, 20px);
    line-height: 20px;
    margin: 10px 0;
    padding: 5px 0;
    color: #232326;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 20px;

    .app-name {
      // padding: 0 10px;
      color: @primary;
      font-weight: bold;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #333333;
    }
  }

  .icon-iconyonghu {
    color: #fff;
    font-size: 22px;
  }

  .login {
    color: black;
    line-height: 52px;
    margin-right: 7px;
    font-size: 14px;

    .van-icon-manager-o {
      font-size: 20px;
      vertical-align: -3px;
    }
  }
}

.header-search {
  display: flex;
  width: 90%;
  height: 20px;
  line-height: 20px;
  margin: 10px auto;
  padding: 5px 0;
  color: #232326;
  background: #f7f7f7;
  border-radius: 20px;
  margin-top: 50px;

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
}

.home-img {
  img {
    display: block;
    width: 90%;
    margin: 10px auto;
  }
}

.category-list {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 13px;

  div {
    display: flex;
    flex-direction: column;
    width: 20%;
    text-align: center;

    img {
      .wh(36px, 36px);
      margin: 13px auto 8px auto;
    }

    span {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #333333;
      text-align: center;
    }
  }
}

.good {
  padding-bottom: 50px;

  .good-header {
    background: #f9f9f9;
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    font-weight: 500;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #333333;
  }

  .good-box {
    padding: 0 15px;

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
</style>
