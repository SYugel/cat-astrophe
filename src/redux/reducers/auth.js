export const LOGIN = 'catastrophe/LOGIN'
export const LOGIN_SUCCESS = 'catastrophe/LOGIN_SUCCESS'
export const LOGIN_FAIL = 'catastrophe/LOGIN_FAIL'
export const LOGOUT = 'catastrophe/LOGOUT'

export const initialState = {
  user: null,
  loginFailed: null,
  working: false,
  isAuthenticated: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loginFailed: null,
        working: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        working: false,
        user: action.payload,
        isAuthenticated: true
      }
    case LOGIN_FAIL:
      return {
        ...state,
        working: false,
        loginFailed: action.payload,
        isAuthenticated: false
      }
    case LOGOUT:
      return initialState

    default:
      return state
  }
}

export const login = ({ email, password }) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: LOGIN })

    const validatedUser = auth({ email, password })
    if (validatedUser.isValid) {
      dispatch({ type: LOGIN_SUCCESS, payload: validatedUser.user })
      resolve({ type: LOGIN_SUCCESS })
    } else {
      dispatch({ type: LOGIN_FAIL, payload: validatedUser.error })
      resolve({ type: LOGIN_FAIL })
    }
  })
}

export const setUser = () => {
  const user = localStorage.getItem('user')
  if (user) {
    return {
      type: LOGIN_SUCCESS,
      payload: JSON.parse(user)
    }
  } else {
    return {
      type: LOGOUT
    }
  }
}

export const logout = () => {
  localStorage.removeItem('user')
  return {
    type: LOGOUT
  }
}

const validUser = {
  firstName: 'Syliva',
  lastName: 'Daniels',
  email: 'test@example.com',
  password: 'letmein2',
  avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
}

function auth({ email, password }) {
  if (email === validUser.email && password === validUser.password) {
    localStorage.setItem('user', JSON.stringify(validUser))
    return {
      isValid: true,
      user: validUser
    }
  } else {
    localStorage.removeItem('user')
    return {
      isValid: false,
      user: null,
      error: 'The email or password is incorrect'
    }
  }
  return true
}
