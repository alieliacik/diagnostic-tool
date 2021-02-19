import styled, { keyframes } from 'styled-components'
import { OpacityAnimation } from '../StyledComponents/OpacityAnimation'

export const MainContentContainer = styled.main`
  grid-area: main;
  background-color: #fff;
  color: black;
  min-height: 100vh;
  align-items: center;
  align-items: center;
`
export const Container = styled.div`
  max-width: 100rem;
  width: 100%;
  margin: 0 auto;
  display: ${({ display }) => display};
  align-items: ${({ alignItems }) => alignItems};
  padding: ${({ padding }) => padding};

  @media (max-width: 60em) {
    width: 95%;
  }
`
export const Title = styled.h1`
  font-weight: 300;
  margin: 2rem 0 1rem 0;
  color: #9c5455;
`
export const SubTitle = styled.div`
  display: flex;
  background-color: #ececec;
  padding: 0.8rem 0;
`
export const SubtitleText = styled.h3`
  font-weight: 300;
  font-size: 2rem;
  margin-left: 1rem;
`
export const SubtitleIconContainer = styled.div`
  margin-left: auto;
`
export const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 4.5fr 5.5fr;
  grid-template-rows: 1fr 4fr;
  grid-gap: 2rem;
  grid-template-areas:
    'filter buttons'
    'cards chart';
  width: 100%;

  @media (max-width: 60em) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-gap: 2rem;
    grid-template-areas:
      'filter'
      'cards'
      'buttons'
      'chart';
  }
`
export const FiltersContainer = styled.div`
  max-width: 40%;
  grid-area: filter;
`
export const FiltersText = styled.p`
  font-weight: 500;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`
export const FiltersBox = styled.div`
  border-radius: 8px;
  border: 1px solid #ececec;
  padding: 1rem;
  min-width: 22rem;
`
export const Filter = styled.div`
  display: flex;
  align-items: center;
`
export const FilterBox = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
`
export const FilterText = styled.p`
  margin: 7px 5px;
  font-size: 1.2rem;
`
export const FilterButtonsContainer = styled.div`
  grid-area: buttons;
  display: flex;
  justify-content: space-between;

  @media (max-width: 60em) {
    flex-direction: column;
    justify-content: flex-start;
  }
`
export const ButtonsTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 300;
  animation: ${OpacityAnimation} 2s;
  margin-bottom: 2rem;
`
export const Buttons = styled.div`
  display: flex;
`
export const Button = styled.button`
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
export const CardsContainer = styled.div`
  grid-area: cards;
  display: flex;
  flex-wrap: wrap;
`
export const ChartContainer = styled.div`
  grid-area: chart;
  animation: ${OpacityAnimation} 2s;
`
