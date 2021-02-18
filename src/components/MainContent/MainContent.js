import React from 'react'
import styled from 'styled-components'
import { AiOutlineGlobal } from 'react-icons/ai'

const MainContentContainer = styled.main`
  grid-area: main;
  background-color: #fff;
  color: black;
`

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  display: ${({ flex }) => flex && 'flex'};
  align-items: ${({ alignCenter }) => alignCenter && 'center'};
`
const Title = styled.h1`
  font-weight: 300;
  margin: 2rem 0 1rem 0;
  color: #9c5455;
`

const SubTitle = styled.div`
  display: flex;
  background-color: #ececec;
  padding: 0.7rem 0;
`

const SubtitleText = styled.h3`
  font-weight: 300;
  font-size: 2rem;
  margin-left: 1rem;
`
const MainContent = () => {
  return (
    <MainContentContainer>
      <Container>
        <Title>PERFORMANCE MANAGEMENT</Title>
      </Container>
      <SubTitle>
        <Container flex alignCenter>
          <AiOutlineGlobal size={30} color='black' />
          <SubtitleText>Diagnostic Tool</SubtitleText>
        </Container>
      </SubTitle>
    </MainContentContainer>
  )
}

export default MainContent
