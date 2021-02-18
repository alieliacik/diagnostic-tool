import { FETCH_DATA } from '../actions/data'

const initialState = {
  data: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        data: action.data,
      }
    default:
      return state
  }
}
