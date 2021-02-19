import { FETCH_DATA, SELECT_CARD } from '../actions/data'

const initialState = {
  gaugeData: [],
  areaData: [],
  dataTitle: 'Quality Score',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        gaugeData: action.gaugeData,
        areaData: action.areaData,
      }

    case SELECT_CARD:
      const modifiedGaugeData = state.gaugeData.map((item) =>
        item.name === action.dataTitle
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      )

      return {
        ...state,
        gaugeData: modifiedGaugeData,
        dataTitle: action.dataTitle,
      }
    default:
      return state
  }
}
