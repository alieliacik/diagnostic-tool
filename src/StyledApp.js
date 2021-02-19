import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
      margin:0;
      padding:0;
    }
  
  *,*::before, *::after {
    box-sizing: inherit
  }
  html {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    font-size: 62.5%;
    @media (max-width: 1080px){
      font-size: 55%;         
    }
  }
`

export const AppContainer = styled.div`
  display: grid;
  grid-template-rows: 4rem 1fr;
  grid-template-columns: 4rem 1fr;
  grid-template-areas:
    'sidebar header'
    'sidebar main';
  min-height: 100vh;
  color: #fff;
`
