<template>
  <div class="user-box">
    <NavBar></NavBar>
    <div class="linear"></div>
    <div class="avatar-box">
      <img src="https://s.yezgea02.com/1604040746310/aaaddd.png" alt="" />
      <div class="user-name">
        <span class="name-cont">{{ username }}</span>
        <span class="name-icon">16</span>
      </div>
      <div class="user-id">ID: 1069643013</div>
      <div class="card-box">
        <div class="card-item" v-for="item in cardList" :key="item.id">
          <div class="card-title">{{ item.msg }}</div>
          <div class="card-num">{{ item.num }}</div>
        </div>
      </div>
    </div>
    <div class="user-nav">
      <div class="nav-item" @click="tip">
        <van-icon name="bill" class="logo" />
        <span class="msg">我的钱包</span>
        <van-icon name="arrow" class="iconlogo" />
      </div>
      <div class="nav-item" @click="tip">
        <van-icon name="location" class="logo" />
        <span class="msg">我的地址</span>
        <van-icon name="arrow" class="iconlogo" />
      </div>
      <div class="nav-item" @click="tip">
        <van-icon name="friends" class="logo" />
        <span class="msg">客服与帮助</span>
        <van-icon name="arrow" class="iconlogo" />
      </div>
      <div class="nav-item" @click="logout">
        <van-icon name="friends" class="logo" />
        <span class="msg">退出登录</span>
        <van-icon name="arrow" class="iconlogo" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { Toast, Dialog } from 'vant'
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'UserVue',
  components: {
    NavBar
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      cardList: [
        {
          id: 1,
          msg: '红包',
          num: '218'
        },
        {
          id: 2,
          msg: '优惠券',
          num: '12张'
        },
        {
          id: 3,
          msg: '鲜豆',
          num: '88'
        },
        {
          id: 4,
          msg: '白条',
          num: '1000'
        }
      ],
      username: ''
    })

    const tip = () => {
      Toast('敬请期待')
    }

    onMounted(() => {
      state.username = store.getters.getUserName
    })

    const logout = () => {
      Dialog.confirm({
        message:
          '确认要退出登陆吗'
      })
        .then(() => {
          store.dispatch('logout', false)
          router.push('/login')
        })
        .catch(() => {
          // on cancel
        })
    }

    return {
      ...toRefs(state),
      tip,
      logout
    }
  }
})
</script>

<style lang="less">
.user-box {
  .linear {
    background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
    height: 250px;
  }

  .avatar-box {
    background: #ffffff;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    border-radius: 8px;
    width: 339px;
    height: 203px;
    position: fixed;
    top: 108px;
    left: 50%;
    transform: translate(-170px);

    img {
      width: 94px;
      height: 94px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: -47px;
      transform: translate(-47px);
    }

    .user-name {
      margin-top: 59px;
      display: flex;
      align-items: center;
      justify-content: center;

      .name-cont {
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #262628;
        letter-spacing: 0.19px;
        text-align: center;
        line-height: 36px;
      }

      .name-icon {
        background-image: linear-gradient(180deg, #bee700 0%, #8aca00 100%);
        border-radius: 100px;
        border-radius: 7.5px;
        margin-left: 12px;
        font-family: SFProText-Medium;
        font-size: 10px;
        color: #ffffff;
        letter-spacing: -0.36px;
      }
    }

    .user-id {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #c1c0c9;
      text-align: center;
    }

    .card-box {
      margin-top: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #f1f1f1;

      .card-item {
        flex: 1;
        padding-top: 12px;

        .card-title {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #c1c0c9;
          text-align: center;
          margin-bottom: 3px;
        }

        .card-num {
          font-family: PingFangSC-Regular;
          font-size: 20px;
          color: #262628;
          text-align: center;
        }
      }
    }
  }

  .user-nav {
    position: absolute;
    top: 327px;
    left: 50%;
    width: 339px;
    // height: 146px;
    background: #ffffff;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    border-radius: 8px;
    transform: translate(-170px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .nav-item {
      flex: 1;
      position: relative;
      margin-bottom: 5px;

      .logo {
        border-radius: 8px;
        border-radius: 8px;
        display: inline-block;
        width: 22px;
        height: 22px;
        font-size: 20px;
        margin-left: 16px;
        margin-top: 16px;
        margin-right: 12px;
      }

      .msg {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #262626;
      }

      .iconlogo {
        position: absolute;
        right: 16px;
        top: 16px;
      }
    }
  }
}
</style>
