export const FETCH_CATS = 'catastrophe/FETCH_CATS'
export const SET_CONFIG = 'catastrophe/SET_CONFIG'

export const initialState = {
  cats: [],
  feedConfig: {
    imageSize: 'medium',
    imageType: 'both'
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATS:
      return {
        ...state
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

export const setConfig = (config) => {
  return {
    type: SET_CONFIG,
    payload: config
  }
}



