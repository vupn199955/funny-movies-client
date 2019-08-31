export const login = (state = {
  isLogin: false,
  username: ""
}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        username: action.data,
        isLogin: true
      }
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        username: "",
        isLogin: false
      }
    default:
      return state
  }
}

export const loadingBar = (state = {
  isLoading: false,
}, action) => {
  switch (action.type) {
    case 'SHOW_LOADING':
      return {
        ...state,
        isLoading: true,
      }
    case 'HIDE_LOADING':
        return {
          ...state,
          isLoading: false,
        }
    default:
      return state
  }
}