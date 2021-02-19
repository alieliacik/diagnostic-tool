export const FETCH_DATA = 'FETCH_DATA'
export const SELECT_CARD = 'SELECT_CARD'
export const FILTER_CHART_DATA = 'FILTER_CHART_DATA'

export const fetchData = () => {
  return async (dispatch) => {
    const response = await fetch(
      'https://diagnostic-tool-1ffda-default-rtdb.firebaseio.com/diagnosticToolData.json'
    )

    if (!response.ok) {
      const errorResData = await response.json()
      alert(errorResData.message)
    }
    const resData = await response.json()
    const modifiedGaugeData = resData.gaugeData.map((item, i) =>
      i === 0 ? { ...item, isSelected: true } : { ...item, isSelected: false }
    )
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

export const selectCard = (name) => {
  return {
    type: SELECT_CARD,
    dataTitle: name,
  }
}

export const filterChartData = (buttonName) => {
  return {
    type: FILTER_CHART_DATA,
    buttonName: buttonName,
  }
}
