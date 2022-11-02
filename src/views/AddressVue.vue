<template>
  <div class="address-box">
    <SimpleHeader name="地址管理"></SimpleHeader>
    <div class="title">我的收货地址</div>
    <div class="address-item">
      <van-address-list v-model="choseAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit"
        @select="select">
      </van-address-list>
      <!-- <van-address-list
        v-else
        v-model="choseAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      >
      </van-address-list> -->
    </div>
  </div>
</template>

<script>
import SimpleHeader from '@/components/SimpleHeader.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
export default defineComponent({
  name: 'AddressVue',
  components: {
    SimpleHeader
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      list: []
    })

    const onAdd = () => {
      router.push({
        path: '/address-edit',
        query: { type: 'add' }
      })
    }

    onMounted(() => {
      // console.log(store.getters.getAllAddress)
      for (const address of store.getters.getAllAddress) {
        address.address = `${address.city} ${address.area} ${address.house}`
        state.list.push(address)
      }
    })

    const onEdit = (item) => {
      store.commit('selectAddress', item)
      router.push({
        path: 'address-edit',
        query: { type: 'edit' }
      })
    }

    const select = (item) => {
      store.commit('selectAddress', item)
      // console.log(store.getters.getAddress)
      router.push({
        path: 'order-commit'
      })
    }

    return {
      ...toRefs(state),
      onAdd,
      onEdit,
      select
    }
  }
})
</script>

<style lang="less">
@import '@/common/style/mixin';

.address-box {
  background: #F5F5F5;

  .title {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    margin-top: 16px;
    margin-left: 18px;
    font-weight: 800;
  }

  .van-radio__icon {
    display: none;
  }

  .address-item {
    // .van-address-item {
    //   .van-cell {
    //     background: #F5F5F5;
    //     border-radius: 4px;
    //   }

    //   background: #F5F5F5;
    //   border-radius: 4px;
    // }


    .van-button {
      background: @primary;
      border-color: @primary;
    }
  }
}
</style>
