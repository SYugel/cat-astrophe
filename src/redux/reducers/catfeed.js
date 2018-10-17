export const FETCH_CATS = 'catastrophe/FETCH_CATS'

export const initialState = {
  cats: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATS:
      return {
        ...state
      }
    default:
      return state
  }
}
