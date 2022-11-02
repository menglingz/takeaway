<template>
  <div class="address-edit-box">
    <SimpleHeader :name="`${type === 'add' ? '新增地址' : '编辑地址'}`"></SimpleHeader>
    <van-cell-group inset class="input-box">
      <van-field v-model="city" label="所在城市：" />
      <van-field v-model="area" label="小区/大厦/学校" />
      <van-field v-model="house" label="楼号-门牌号" />
      <van-field v-model="name" label="收货人" />
      <van-field v-model="tel" label="联系电话" />
    </van-cell-group>
    <van-button round type="primary" @click.prevent="submit">提交</van-button>
  </div>
</template>


<script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import SimpleHeader from '@/components/SimpleHeader.vue'
export default defineComponent({
  name: 'AddressEdit',
  components: { SimpleHeader },
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      type: route.query.type,
      city: '',
      area: '',
      house: '',
      name: '',
      tel: ''
    })


    const getRandom = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const submit = () => {
      let id = ''
      for (let i = 0; i < 5; i++) {
        id += getRandom(0, 9)
      }
      if (state.type === 'add') {
        const params = {
          id: parseInt(id),
          isDefault: false,
          city: state.city,
          area: state.area,
          house: state.house,
          name: state.name,
          tel: state.tel
        }
        store.commit('addAddress', params)
      } else if (state.type === 'edit') {
        const address = store.getters.getAddress
        const params = {
          id: address.id,
          isDefault: false,
          city: state.city,
          area: state.area,
          house: state.house,
          name: state.name,
          tel: state.tel
        }
        store.commit('editAddress', params)
        // console.log(store.getters.getAllAddress)
      }
      router.push('/address')
    }

    onMounted(() => {
      if (state.type === 'edit') {
        // console.log(store.getters.getAddress)
        state.name = store.getters.getAddress.name
        state.tel = store.getters.getAddress.tel
        state.city = store.getters.getAddress.city
        state.house = store.getters.getAddress.house
        state.area = store.getters.getAddress.area
      }
    })

    return {
      ...toRefs(state),
      submit
    }
  }
})
</script>

<style lang="less" >
@import '@/common/style/mixin';

.address-edit-box {

  background: #F5F5F5;

  .input-box {
    margin: 0;
    margin-top: 12px;
    background: #FFFFFF;
    margin-bottom: 12px;



    .van-cell {
      border-bottom: 1px solid #F1F1F1;
      ;

      .van-cell__title {
        font-size: 14px;
        color: #666666;
        width: auto;
      }
    }
  }

  .van-button {
    margin: 0 auto;
    display: block;
    width: 50%;
  }

}
</style>
