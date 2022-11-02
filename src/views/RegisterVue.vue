<template>
  <div class="login">
    <SimpleHeader name="注册"></SimpleHeader>
    <img src="../assets/avatar.png" alt="" class="logo" />
    <div class="login-body register">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        >
        </van-field>
        <van-field
          v-model="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        >
        </van-field>
        <van-field
          v-model="repassword"
          name="repassword"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请确认密码' }]"
        >
        </van-field>
        <van-field
          v-model="verify"
          center
          clearable
          label="验证码"
          placeholder="输入验证码"
        >
          <template #button>
            <img-verify ref="verifyRef" />
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button round block color="#1baeae" native-type="submit"
            >注册</van-button
          >
          <div class="link-box">
            <router-link to="/login">已有账号去登录</router-link>
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import SimpleHeader from '@/components/SimpleHeader.vue'
import ImgVerify from '@/components/ImgVerify.vue'
import { Toast } from 'vant'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { defineComponent, ref, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'LoginVue',
  components: {
    SimpleHeader,
    ImgVerify
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const verifyRef = ref(null)
    const state = reactive({
      username: '',
      password: '',
      repassword: '',
      verify: '',
      imgCode: ''
    })

    const onSubmit = () => {
      // console.log(verifyRef.value.imgCode)
      if (state.username) {
        const userlist = store.getters.getUserList
        console.log(userlist.indexOf(state.username))
        if (userlist.indexOf(state.username) !== -1) {
          Toast.fail('用户名已存在，请直接登录！')
          router.push('/login')
          return
        }
      }
      state.imgCode = verifyRef.value.imgCode || ''
      if (state.verify.toLowerCase() !== state.imgCode.toLowerCase()) {
        Toast.fail('验证码错误')
        return
      }
      if (state.password !== state.repassword) {
        Toast.fail('两次密码不一致')
        return
      }
      store.commit('register', {
        username: state.username,
        password: state.password
      })
      Toast.success('注册成功')
      router.push('/login')
    }

    return {
      ...toRefs(state),
      verifyRef,
      onSubmit
    }
  }
})
</script>

<style lang="less">
.login {
  .logo {
    width: 120px;
    height: 120px;
    display: block;
    margin: 80px auto 20px;
  }

  .login-body {
    padding: 0 20px;

    .link-box {
      display: flex;
      justify-content: center;

      a {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
        letter-spacing: 0;
        margin-top: 16px;
        display: inline-block;
      }
    }
  }

  .login {
    .link-register {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
    }
  }
}
</style>
