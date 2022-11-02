interface stateProp {
  user?: object
  username?: string
  isLogin: boolean
}

interface gettersProp {
  getUserName?: function
  isLogin?: function
}

export declare const state: stateProp
export declare const getters: gettersProp
