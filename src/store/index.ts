import { createStore } from 'vuex'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user: {
      state: {
        user: [
          {
            username: '17686611652',
            password: '123456'
          }
        ],
        userlist: ['17686611652'],
        username: '',
        isLogin: false
      },
      getters: {
        getUserName(state) {
          if (!state.isLogin) {
            state.username = sessionStorage.getItem('username')
          }
          return sessionStorage.getItem('username')
        },
        isLogin(state) {
          if (!state.isLogin) {
            state.isLogin = sessionStorage.getItem('isLogin')
          }
          return sessionStorage.getItem('isLogin')
        },
        getPassword(state) {
          let password = ''
          state.user.forEach((obj: any) => {
            if (obj.username === state.username) {
              password = obj.password
            }
          })
          return password
        },
        getUserList(state) {
          return state.userlist
        }
      },
      mutations: {
        userLogin(state, data) {
          sessionStorage.setItem('username', data)
          sessionStorage.setItem('isLogin', 'true')
          state.isLogin = true
          state.username = data
        },
        userRegister(state, data) {
          if (state.userlist.indexOf(data.username) === -1) {
            state.userlist.push(data.username)
          }
          state.user.push(data)
        },
        UserLogOut(state, data) {
          console.log(2)
          sessionStorage.removeItem('username')
          sessionStorage.removeItem('isLogin')
          state.isLogin = data
          state.username = ''
        },
        register(state, data) {
          console.log('register')
          state.user.push(data)
          state.userlist.push(data.username)
        },
        setUserName(state, data) {
          state.username = data
        }
      },
      actions: {
        login({ commit }, username) {
          commit('userLogin', username)
        },
        logout({ commit }, status) {
          console.log(1)
          commit('UserLogOut', status)
        }
      }
    },
    car: {
      state: {
        carList: [
          {
            id: 1,
            cart: [
              {
                id: 1,
                goodCount: 1,
                msg: '番茄250g/份',
                checked: true,
                imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnxU1.png',
                gooder: '沃尔玛'
              },
              {
                id: 2,
                goodCount: 3,
                checked: true,
                msg: '提子250g/份',
                imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnmnb.png',
                gooder: '沃尔玛'
              },
              {
                id: 3,
                goodCount: 1,
                checked: true,
                msg: '樱桃250g/份',
                imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVns7o.png',
                gooder: '沃尔玛'
              },
              {
                id: 4,
                goodCount: 1,
                checked: true,
                msg: '苹果250g/份',
                imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVn4BD.png',
                gooder: '沃尔玛'
              }
            ]
          },
          {
            id: 2,
            cart: [
              {
                id: 1,
                goodCount: 1,
                msg: '番茄250g/份',
                checked: true,
                imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnxU1.png',
                gooder: '沃尔玛'
              },
              {
                id: 2,
                goodCount: 3,
                checked: true,
                msg: '提子250g/份',
                imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnmnb.png',
                gooder: '沃尔玛'
              },
              {
                id: 3,
                goodCount: 1,
                checked: true,
                msg: '樱桃250g/份',
                imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVns7o.png',
                gooder: '沃尔玛'
              },
              {
                id: 4,
                goodCount: 1,
                checked: true,
                msg: '苹果250g/份',
                imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVn4BD.png',
                gooder: '沃尔玛'
              }
            ]
          },
          {
            id: 3,
            cart: [
              {
                id: 2,
                goodCount: 1,
                checked: true,
                msg: '提子250g/份',
                imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnmnb.png',
                gooder: '沃尔玛'
              },
              {
                id: 3,
                goodCount: 4,
                checked: true,
                msg: '樱桃250g/份',
                imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVns7o.png',
                gooder: '沃尔玛'
              }
            ]
          }
        ],
        purchase: null,
        cartCount: 3
      },
      getters: {
        getCoomitCart(state) {
          if (!state.purchase) {
            state.purchase = JSON.parse(
              sessionStorage.getItem('cart') as string
            )
          }
          return state.purchase
        },
        getAllCart(state) {
          return state.carList
        },
        getCartCount(state) {
          return state.cartCount
        }
      },
      mutations: {
        addCar(state, data) {
          state.carList.push(data)
          state.cartCount++
        },
        commitOrder(state, data) {
          state.purchase = data
          state.purchase = data
          if (sessionStorage.getItem('cart')) {
            sessionStorage.removeItem('cart')
          }
          sessionStorage.setItem('cart', JSON.stringify(data))
        },
        delete(state, data) {
          for (const x in state.carList) {
            if (state.carList[x].id === data.id) {
              state.carList.splice(x, 1)
            }
          }
          state.cartCount--
        }
      },
      actions: {
        buy({ commit }, good) {
          commit('addCar', good)
        },
        commitCart({ commit }, cart) {
          commit('commitOrder', cart)
        },
        deleteCart({ commit }, cart) {
          commit('delete', cart)
        }
      }
    },
    address: {
      state: {
        addressList: [
          {
            id: 12711,
            name: 'meng',
            tel: '12311111111',
            city: '济南市',
            area: '银河大厦',
            house: 'E座',
            isDefault: false
          },
          {
            id: 12684,
            name: '111',
            tel: '11111111111',
            city: '北京市',
            area: '东城区',
            house: '31号',
            isDefault: false
          }
        ],
        address: null
      },
      getters: {
        getAllAddress(state) {
          return state.addressList
        },
        getAddress(state) {
          if (!state.address) {
            state.address = JSON.parse(
              sessionStorage.getItem('address') as string
            )
          }
          return JSON.parse(sessionStorage.getItem('address') as string)
        }
      },
      mutations: {
        addAddress(state, data) {
          if (!state.addressList.some((item: any) => item.id === data.id)) {
            state.addressList.push(data)
          }
        },
        editAddress(state, data) {
          state.addressList.forEach((item: any, index: number) => {
            if (item.id === data.id) {
              state.addressList.splice(index, 1)
              state.addressList.push(data)
            }
          })
        },
        deleteAddress(state, data) {
          state.addressList.forEach((item: any, index: number) => {
            if (item.id === data.id) {
              state.addressList.splice(index, 1)
            }
          })
        },
        selectAddress(state, data) {
          state.address = data
          sessionStorage.setItem('address', JSON.stringify(data))
        }
      }
    },
    order: {
      state: {
        orderList: [
          {
            gooder: '沃尔玛',
            state: '已支付',
            goods: [
              {
                id: 1,
                goodCount: 1,
                msg: '番茄250g/份',
                checked: true,
                imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnxU1.png'
              },
              {
                id: 2,
                goodCount: 1,
                checked: true,
                msg: '提子250g/份',
                imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVnmnb.png'
              },
              {
                id: 3,
                goodCount: 1,
                checked: true,
                msg: '樱桃250g/份',
                imgUrl: 'https://www.helloimg.com/images/2022/10/28/ZVns7o.png'
              }
            ]
          }
        ],
        order: null
      },
      getters: {
        getOrder(state) {
          return state.orderList
        }
      },
      mutations: {
        addOrder(state, data) {
          state.orderList.push(data)
        }
      }
    },
    search: {
      state: {
        searchHistory: [
          {
            id: 1,
            tag: 'history',
            msg: '搜索历史',
            data: [
              {
                id: 1,
                msg: '青椒肉丝'
              },
              {
                id: 2,
                msg: '鲜花'
              },
              {
                id: 3,
                msg: '山姆会员商店'
              },
              {
                id: 4,
                msg: '新鲜水果'
              },
              {
                id: 5,
                msg: '生日鲜花'
              },
              {
                id: 6,
                msg: '香槟玫瑰'
              },
              {
                id: 7,
                msg: '酸奶'
              },
              {
                id: 8,
                msg: '玫瑰'
              }
            ]
          },
          {
            id: 2,
            tag: 'hot',
            msg: '热门搜索',
            data: [
              {
                id: 1,
                msg: '青椒肉丝'
              },
              {
                id: 2,
                msg: '鲜花'
              },
              {
                id: 3,
                msg: '山姆会员商店'
              },
              {
                id: 4,
                msg: '新鲜水果'
              },
              {
                id: 5,
                msg: '生日鲜花'
              },
              {
                id: 6,
                msg: '香槟玫瑰'
              },
              {
                id: 7,
                msg: '酸奶'
              },
              {
                id: 8,
                msg: '玫瑰'
              }
            ]
          }
        ]
      },
      getters: {
        getSearch(state) {
          return state.searchHistory
        }
      },
      mutations: {
        addSearch(state, data) {
          state.searchHistory[0].data.push(data)
        }
      }
    }
  }
})
