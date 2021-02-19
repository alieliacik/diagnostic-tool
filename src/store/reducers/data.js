import { FETCH_DATA, FILTER_CHART_DATA, SELECT_CARD } from '../actions/data'

const initialState = {
  gaugeData: [],
  areaData: [],
  dataTitle: 'Quality Score',
  allFilterButtons: [
    { name: 'Day', isDisabled: true, isSelected: false },
    { name: 'Week', isDisabled: true, isSelected: false },
    { name: 'Month', isDisabled: true, isSelected: false },
    { name: 'Quarter', isDisabled: false, isSelected: true },
    { name: 'Half', isDisabled: false, isSelected: false },
    { name: 'Year', isDisabled: false, isSelected: false },
  ],
  slice: -3,
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
    case FILTER_CHART_DATA:
      const modifiedAllButtons = state.allFilterButtons.map((btn) =>
        action.buttonName === btn.name
          ? { ...btn, isSelected: true }
          : { ...btn, isSelected: false }
      )
      let modifiedSlice
      if (action.buttonName === 'Quarter') {
        modifiedSlice = -3
      } else if (action.buttonName === 'Half') {
        modifiedSlice = -6
      } else if (action.buttonName === 'Year') {
        modifiedSlice = -12
      }

      return {
        ...state,
        allFilterButtons: modifiedAllButtons,
        slice: modifiedSlice,
      }
    default:
      return state
  }
}
