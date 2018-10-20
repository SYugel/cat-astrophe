import axios from 'axios'
const CAT_API_URL = 'https://api.thecatapi.com/v1'
const CAT_API_KEY = 'cfd1ad99-38c0-4acf-917e-fab384dd5eda'

export const FETCH_CATS = 'catastrophe/FETCH_CATS'
export const FETCH_CATS_SUCCESS = 'catastrophe/FETCH_CATS_SUCCESS'
export const FETCH_CATS_FAIL = 'catastrophe/FETCH_CATS_FAIL'
export const SET_CONFIG = 'catastrophe/SET_CONFIG'
export const RESET_FEED = 'catastrophe/RESET_FEED'

export const initialState = {
  cats: [],
  isLoading: false,
  feedConfig: {
    imageSize: 'med',
    imageType: 'jpg,png,gif'
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATS:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_CATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cats: state.cats.concat(action.payload)
      }
    case FETCH_CATS_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case RESET_FEED:
      return {
        ...state,
        cats: []
      }
    case SET_CONFIG:
      return {
        ...state,
        feedConfig: {
          ...state.feedConfig,
          ...action.payload
        }
      }
    default:
      return state
  }
}

export const fetchCats = ({ imageSize, imageType }) => dispatch => {
  dispatch({ type: FETCH_CATS })
  return axios
    .get(`${CAT_API_URL}/images/search`, {
      headers: {
        'content-type': 'application/json',
        'x-api-key': CAT_API_KEY
      },
      params: {
        size: imageSize,
        mime_types: imageType,
        limit: 10
      }
    })
    .then(res => {
      dispatch({ type: FETCH_CATS_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: FETCH_CATS_FAIL })
    })
}

export const setConfig = config => {
  return {
    type: SET_CONFIG,
    payload: config
  }
}

export const resetFeed = () => {
  return {
    type: RESET_FEED
  }
}
