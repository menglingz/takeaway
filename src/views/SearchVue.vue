<template>
  <div class="search-box">
    <SimpleHeader name="搜索"></SimpleHeader>
    <form action="/">
      <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel"
        @focus="onFocus" @blur="onBlur" />
    </form>
    <div class="search-key" v-if="show">
      <div class="search-item" v-for="item in list" :key="item.id">
        <div class="title">
          <div class="name">搜索历史</div>
          <div class="clear" v-if="item.tag === 'history'">清除搜索历史</div>
        </div>
        <div class="con">
          <ul>
            <li v-for="x in item.data" :key="x.id">{{ x.msg }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="search-list" v-if="searchShow">
      <div class="item" v-for="item in searchList" :key="item.id">
        <div class="left">
          <img :src="item.imgUrl" alt="">
        </div>
        <div class="right">
          <div class="title">{{ item.gooder }}</div>
          <div class="introduce">
            <span>{{ item.sale }}</span>
            <span>{{ item.takeaway }}</span>
            <span>{{ item.takesale }}</span>
          </div>
          <div class="vip">{{ item.vip }}</div>
          <div class="good">
            <div class="good-item" v-for="x in item.good" :key="x.id">
              <img :src="x.imgUrl" alt="">
              <div class="good-name">{{ x.name }}</div>
              <div class="good-price">
                <span class="new-price">{{ x.newPrice }}</span>
                <span class="old-price" v-if="x.oldPrice">{{ x.oldPrice }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import SimpleHeader from '@/components/SimpleHeader.vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'SearchVue',
  components: {
    SimpleHeader
  },
  setup () {
    const store = useStore()
    const state = reactive({
      value: '',
      list: [],
      show: false,
      searchShow: false,
      searchList: [
        {
          id: 1,
          imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnxU1.png',
          gooder: '沃尔玛',
          sale: '月售1万+',
          takeaway: '起送￥0',
          takesale: '基础运费￥5',
          vip: 'VIP尊享满89元减4元运费券（每月3张）',
          good: [
            {
              id: 1,
              imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnmnb.png',
              name: '番茄250g/份',
              newPrice: '￥33.6'
            },
            {
              id: 2,
              imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVns7o.png',
              name: '超甜橙子250g/份',
              newPrice: '￥33.6',
              oldPrice: '￥33.6'
            },
            {
              id: 3,
              imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVn4BD.png',
              name: '超甜草莓250g/份',
              newPrice: '￥33.6',
              oldPrice: '￥33.6'
            }
          ]
        },
        {
          id: 2,
          imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnLwC.png',
          gooder: '京东7FRESH生鲜',
          sale: '月售1万+',
          takeaway: '起送￥0',
          takesale: '全免运费',
          vip: 'VIP尊享满89元减4元运费券（每月3张）',
          good: [
            {
              id: 1,
              imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnmnb.png',
              name: '番茄250g/份',
              newPrice: '￥33.6'
            },
            {
              id: 2,
              imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVns7o.png',
              name: '超甜橙子250g/份',
              newPrice: '￥33.6',
              oldPrice: '￥33.6'
            },
            {
              id: 3,
              imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVn4BD.png',
              name: '超甜草莓250g/份',
              newPrice: '￥33.6',
              oldPrice: '￥33.6'
            }
          ]
        },
        {
          id: 3,
          imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnSfQ.png',
          gooder: '百果园',
          sale: '月售1万+',
          takeaway: '起送￥0',
          takesale: '全免运费',
          vip: 'VIP尊享满89元减4元运费券（每月3张）',
          good: [
            {
              id: 1,
              imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnmnb.png',
              name: '番茄250g/份',
              newPrice: '￥33.6'
            },
            {
              id: 2,
              imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVns7o.png',
              name: '超甜橙子250g/份',
              newPrice: '￥33.6',
              oldPrice: '￥33.6'
            },
            {
              id: 3,
              imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVn4BD.png',
              name: '超甜草莓250g/份',
              newPrice: '￥33.6',
              oldPrice: '￥33.6'
            }
          ]
        }
      ]
    })

    const onSearch = (value) => {
      console.log(value)
      state.show = false
      state.searchShow = true
    }
    const onCancel = () => {
      console.log(2)
    }

    const onFocus = () => {
      state.show = true
    }

    const onBlur = () => {
      state.show = false
    }

    onMounted(() => {
      for (const key of store.getters.getSearch) {
        state.list.push(key)
      }
    })

    return {
      ...toRefs(state),
      onSearch,
      onCancel,
      onFocus,
      onBlur
    }
  }
})
</script>

<style lang="less">
.search-box {
  .van-search__content {
    background: #F5F5F5;
    border-radius: 16px;
  }

  .van-search__action {
    font-size: 16px;
    color: #333333;
    line-height: 16px;
  }

  .search-key {
    box-sizing: border-box;
    padding: 0 18px;
    transition: all 1.3s;

    .search-item {
      margin-top: 24px;

      .title {
        display: flex;
        justify-content: space-between;

        .name {
          font-size: 16px;
          color: #333333;
          font-weight: bolder;
        }

        .clear {
          font-size: 14px;
          color: #333333;
          font-weight: 600;
        }
      }

      .con {
        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            margin-top: 12px;
            margin-right: 6px;
            background: #F5F5F5;
            border-radius: 2px;
            line-height: 32px;
            box-sizing: border-box;
            padding: 0 10px;
          }
        }
      }
    }
  }

  .search-list {
    box-sizing: border-box;
    padding-left: 18px;

    .item {
      margin-top: 18px;
      display: flex;
      margin-bottom: 6px;

      .left {
        margin-right: 16px;

        img {
          width: 56px;
          height: 56px;
        }
      }

      .right {
        .title {
          font-size: 16px;
          color: #333333;
          line-height: 22px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .introduce {
          font-size: 14px;
          color: #333333;
          margin-bottom: 8px;

          span {
            margin-right: 16px;
          }
        }

        .vip {
          font-size: 14px;
          color: #E93B3B;
          line-height: 18px;
          margin-bottom: 8px;
        }

        .good {
          display: flex;

          .good-item {
            margin-right: 14px;

            img {
              width: 76px;
              height: 76px;
              margin-bottom: 4px;
            }

            .good-name {
              font-size: 13px;
              line-height: 17px;
              color: #333333;
              margin-bottom: 2px;
              width: 80px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .good-price {
              .new-price {
                font-size: 14px;
                color: #E93B3B;
                line-height: 20px;
                margin-right: 4px;
              }

              .old-price {
                font-size: 12px;
                color: #999999;
                line-height: 14px;
                text-decoration: line-through;
              }
            }
          }
        }
      }
    }
  }
}
</style>
