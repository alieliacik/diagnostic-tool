import './App.css'

import styled, { createGlobalStyle } from 'styled-components'
import SideBar from './components/SideBar/SideBar'
import Header from './components/Header/Header'
import MainContent from './components/MainContent/MainContent'

const GlobalStyle = createGlobalStyle`
  * {
      margin:0;
      padding:0;
    }
  
  *,*::before, *::after {
    box-sizing: inherit
  }
  html {
    font-family: 'Roboto', sans-serif;
    font-size: 62.5%;
    box-sizing: border-box;
  }
`

const AppContainer = styled.div`
  display: grid;
  grid-template-rows: 4rem 1fr;
  grid-template-columns: 4rem 1fr;
  grid-template-areas:
    'sidebar header'
    'sidebar main';
  min-height: 100vh;
  color: #fff;
`

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <Header />
      <SideBar />
      <MainContent />
    </AppContainer>
  )
}

export default App
