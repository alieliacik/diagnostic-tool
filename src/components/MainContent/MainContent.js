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
  // gaugeData is the data that we get from database. Handling it in redux store.
  const gaugeData = useSelector((state) => state.data.gaugeData)

  // Decided to setup title and filter buttons in redux store. Bringing them in.
  const dataTitle = useSelector((state) => state.data.dataTitle)
  const allFilterButtons = useSelector((state) => state.data.allFilterButtons)

  // fetchDataHandler fetchs data and must be async, waits server response.
  // useCallback prevents unnecessary rendering.

  const fetchDataHandler = useCallback(async () => {
    // error must return null every time in order to catch the other error if we get second error.
    // Otherwise we might see a wrong error
    setError(null)

    // loading manages if we show user loading spinner or not. Returns true beginning of the http request.
    setIsLoading(true)
    try {
      // Caling the redux action.
      await dispatch(dataActions.fetchData())
    } catch (error) {
      // Catching error if we have any.
      setError(error.message)
    }

    // If everthing is Ok, showing user UI.
    setIsLoading(false)
  }, [dispatch, setIsLoading, setError])

  // useEffect runs after render. Data is not ready until render is done.
  // I can show loading spinner until request is done.
  useEffect(() => {
    fetchDataHandler()
  }, [fetchDataHandler])

  // Component re-renders if we get a new error.
  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  // We can put a loadign spinner in bigger applications.
  if (isLoading) {
    return <h1>Loading spinner...</h1>
  }

  return (
    <MainContentContainer>
      {/* Using the same Container element with minor modifications. */}
      <Container>
        <Title>PERFORMANCE MANAGEMENT</Title>
      </Container>
      <SubTitle>
        <Container display='flex' alignItems='center'>
          <AiOutlineGlobal size={25} color='black' />
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
            {/* ButtonTitle is changin dynamically. Setting up a key is important here. Teling redux to watch changes. Reanimating title when the name changes.*/}
            <ButtonsTitle key={dataTitle}>
              {dataTitle.toUpperCase()} TREND
            </ButtonsTitle>

            {/* Bringing in buttons from redux store and passing data to Button container. */}
            <Buttons>
              {allFilterButtons.map((btn) => (
                <Button
                  key={btn.name}
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

          {/* Bringing in cards from redux store and passing data to Card container. */}
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

          {/* Setting up a key is important here. Teling redux to watch changes. Reanimating the chart when the name changes.*/}
          <ChartContainer key={dataTitle}>
            <Chart />
          </ChartContainer>
        </ContentContainer>
      </Container>
    </MainContentContainer>
  )
}

export default MainContent
