import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import {
  AiOutlineGlobal,
  AiFillInfoCircle,
  AiFillPushpin,
} from 'react-icons/ai'

import * as dataActions from '../../store/actions/data'
import Card from '../StyledComponents/Card'
import Chart from './Chart'
const MainContentContainer = styled.main`
  grid-area: main;
  background-color: #fff;
  color: black;
  min-height: 100vh;
  align-items: center;
  align-items: center;
`
const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  display: ${({ display }) => display};
  align-items: ${({ alignItems }) => alignItems};
  padding: ${({ padding }) => padding};
`
const Title = styled.h1`
  font-weight: 300;
  margin: 2rem 0 1rem 0;
  color: #9c5455;
`
const SubTitle = styled.div`
  display: flex;
  background-color: #ececec;
  padding: 0.8rem 0;
`
const SubtitleText = styled.h3`
  font-weight: 300;
  font-size: 2rem;
  margin-left: 1rem;
`
const SubtitleIconContainer = styled.div`
  margin-left: auto;
`
const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 4.5fr 5.5fr;
  grid-template-rows: 1fr 4fr;
  grid-gap: 2rem;
  grid-template-areas:
    'filter buttons'
    'cards chart';
  width: 100%;
`
const FiltersContainer = styled.div`
  max-width: 40%;
  grid-area: filter;
`
const FiltersText = styled.p`
  font-weight: 500;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`
const FiltersBox = styled.div`
  border-radius: 8px;
  border: 1px solid #ececec;
  padding: 1rem;
  min-width: 22rem;
`
const Filter = styled.div`
  display: flex;
  align-items: center;
`
const FilterBox = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
`
const FilterText = styled.p`
  margin: 7px 5px;
  font-size: 1.2rem;
`
const FilterButtonsContainer = styled.div`
  grid-area: buttons;
  display: flex;
  justify-content: space-between;
`
const opacityAnimation = keyframes`
  from {opacity: 0}
  to {opacity: 1}
`
const ButtonsTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 300;
  animation: ${opacityAnimation} 2s;
`
const Buttons = styled.div`
  display: flex;
`
const Button = styled.button`
  padding: 0 1rem;
  background-color: ${({ isSelected }) => (isSelected ? '#06426F' : '#0071c5')};
  border: none;
  height: 2.9rem;
  color: #fff;
  border-radius: 4px;
  margin: 0 2px;
  cursor: pointer;
  transition: all 0.2s;
  backface-visibility: hidden;
  box-shadow: ${({ isSelected }) =>
    isSelected
      ? '0 3px 6px 0 rgba(0, 0, 0, 0.3)'
      : ' 0 1.5px 3px 0 rgba(0, 0, 0, 0.3)'};
  &:hover {
    transform: ${({ isSelected }) => !isSelected && 'translateY(-2px)'};
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 1.5px 3px 0 rgba(0, 0, 0, 0.3);
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: #c0dcf1;
    transform: none;
    box-shadow: none;
    cursor: not-allowed;
  }
`
const CardsContainer = styled.div`
  grid-area: cards;
  display: flex;
  flex-wrap: wrap;
`
const ChartContainer = styled.div`
  grid-area: chart;
  animation: ${opacityAnimation} 2s;
`
const MainContent = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()
  const gaugeData = useSelector((state) => state.data.gaugeData)
  const dataTitle = useSelector((state) => state.data.dataTitle)
  const allFilterButtons = useSelector((state) => state.data.allFilterButtons)

  const fetchDataHandler = useCallback(async () => {
    setError(null)
    setIsLoading(true)
    try {
      await dispatch(dataActions.fetchData())
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [dispatch, setIsLoading, setError])

  useEffect(() => {
    fetchDataHandler()
  }, [fetchDataHandler])

  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  if (isLoading) {
    return <h1>Loading</h1>
  }

  return (
    <MainContentContainer>
      <Container>
        <Title>PERFORMANCE MANAGEMENT</Title>
      </Container>
      <SubTitle>
        <Container display='flex' alignItems='center'>
          <AiOutlineGlobal size={30} color='black' />
          <SubtitleText>Diagnostic Tool</SubtitleText>
          <SubtitleIconContainer>
            <AiFillPushpin color='black' size={20} />
          </SubtitleIconContainer>
        </Container>
      </SubTitle>
      <Container display='flex' padding='2.5rem 0 1rem 0'>
        <ContentContainer>
          <FiltersContainer>
            <FiltersText>Filters</FiltersText>
            <FiltersBox>
              <Filter>
                <FilterBox backgroundColor='#0570C5' />
                <FilterText>All CQA Results</FilterText>
                <AiFillInfoCircle size={16} />
              </Filter>
              <Filter>
                <FilterBox backgroundColor='#EEEEEE' />
                <FilterText>CQAs with Closed Loop</FilterText>
                <AiFillInfoCircle size={16} />
              </Filter>
            </FiltersBox>
          </FiltersContainer>
          <FilterButtonsContainer>
            <ButtonsTitle key={dataTitle}>
              {dataTitle.toUpperCase()} TREND
            </ButtonsTitle>
            <Buttons>
              {allFilterButtons.map((btn) => (
                <Button
                  key={btn.id}
                  onClick={() =>
                    dispatch(dataActions.filterChartData(btn.name))
                  }
                  disabled={btn.isDisabled}
                  isSelected={btn.isSelected}
                >
                  {btn.name}
                </Button>
              ))}
            </Buttons>
          </FilterButtonsContainer>
          <CardsContainer>
            {!!gaugeData &&
              gaugeData.map((item) => (
                <Card
                  key={item.name}
                  name={item.name}
                  score={item.score}
                  sample={item.sample}
                  isSelected={item.isSelected}
                />
              ))}
          </CardsContainer>
          <ChartContainer key={dataTitle}>
            <Chart />
          </ChartContainer>
        </ContentContainer>
      </Container>
    </MainContentContainer>
  )
}

export default MainContent
