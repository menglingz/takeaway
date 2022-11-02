import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginVue.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeVue.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/OrderVue.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/CartVue.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/SearchVue.vue'),
    meta: {
      index: 2
    }
  },
  {
    path: '/gooder-detail/:gooder',
    name: 'gooder-detail',
    component: () => import('@/views/GooderDetail.vue'),
    meta: {
      index: 2
    }
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('@/views/AddressVue.vue'),
    meta: {
      index: 2
    }
  },
  {
    path: '/address-edit',
    name: 'address-edit',
    component: () => import('@/views/AddressEdit.vue'),
    meta: {
      index: 3
    }
  },
  {
    path: '/order-commit',
    name: 'order-commit',
    component: () => import('@/views/OrderCommit.vue'),
    meta: {
      index: 3
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterVue.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/UserVue.vue'),
    meta: {
      index: 1
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
