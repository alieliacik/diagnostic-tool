import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import { GlobalStyle, AppContainer } from './StyledApp'
import SideBar from './components/SideBar/SideBar'
import Header from './components/Header/Header'
import MainContent from './components/MainContent/MainContent'
import dataReducer from './store/reducers/data'

const rootReducer = combineReducers({
  data: dataReducer,
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))
function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <GlobalStyle />
        <Header />
        <SideBar />
        <MainContent />
      </AppContainer>
    </Provider>
  )
}

export default App
