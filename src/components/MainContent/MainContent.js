import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  AiOutlineGlobal,
  AiFillInfoCircle,
  AiFillPushpin,
} from 'react-icons/ai'
import {
  MainContentContainer,
  Container,
  Title,
  SubTitle,
  SubtitleText,
  SubtitleIconContainer,
  ContentContainer,
  FiltersContainer,
  FilterButtonsContainer,
  FiltersText,
  FiltersBox,
  Filter,
  FilterBox,
  FilterText,
  ButtonsTitle,
  Button,
  Buttons,
  CardsContainer,
  ChartContainer,
} from './StyledMainContent'
import * as dataActions from '../../store/actions/data'
import Card from './Card'
import Chart from './Chart'

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
                  item={item}
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
