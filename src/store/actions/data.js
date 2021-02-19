export const FETCH_DATA = 'FETCH_DATA'
export const SELECT_CARD = 'SELECT_CARD'
export const FILTER_CHART_DATA = 'FILTER_CHART_DATA'

export const fetchData = () => {
  // Asynchronous function with the help of Redux Thunk.
  return async (dispatch) => {
    const response = await fetch(
      'https://diagnostic-tool-1ffda-default-rtdb.firebaseio.com/diagnosticToolData.json'
    )

    // Handling errors if the request fails.
    if (!response.ok) {
      const errorResData = await response.json()
      alert(errorResData.message)
    }

    // gaugeData is an array of object, no need any modification expect adding isSelected in order to manage if it is selected or not.
    // Quality Score is auto-selected at first.
    const resData = await response.json()
    const modifiedGaugeData = resData.gaugeData.map((item, i) =>
      i === 0 ? { ...item, isSelected: true } : { ...item, isSelected: false }
    )

    // areaData is an object of object, needed to convert it an array of object.
    // In order to use it more functionally. Array methods much hendier when you use React.
    let modifiedAreaData = []
    for (const key in resData.areaData) {
      modifiedAreaData.push({
        name: key,
        data: resData.areaData[key],
      })
    }
    dispatch({
      type: FETCH_DATA,
      gaugeData: modifiedGaugeData,
      areaData: modifiedAreaData,
    })
  }
}

// Selecting the card.
export const selectCard = (name) => {
  return {
    type: SELECT_CARD,
    dataTitle: name,
  }
}

// Adjusting UI acordinge to user filter selection.
export const filterChartData = (buttonName) => {
  return {
    type: FILTER_CHART_DATA,
    buttonName: buttonName,
  }
}
