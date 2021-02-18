export const FETCH_DATA = 'FETCH_DATA'

export const fetchData = () => {
  return async (dispatch) => {
    const response = await fetch(
      'https://diagnostic-tool-1ffda-default-rtdb.firebaseio.com/.json'
    )

    if (!response.ok) {
      const errorResData = await response.json()
      alert(errorResData.message)
    }

    const resData = await response.json()

    dispatch({
      type: FETCH_DATA,
      data: resData,
    })
  }
}
