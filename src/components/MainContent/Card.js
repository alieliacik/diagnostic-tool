import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import * as dataActions from '../../store/actions/data'
import { OpacityAnimation } from '../StyledComponents/OpacityAnimation'

const Card = (props) => {
  const dispatch = useDispatch()
  const scoreIntervalRef = useRef()
  const sampleIntervalRef = useRef()
  const [score, setScore] = useState(0)
  const [sample, setSample] = useState(0)

  const selectCardHandler = (name) => {
    dispatch(dataActions.selectCard(name))
  }

  // Handles the first Card Animation.
  useEffect(() => {
    if (score < props.item.score) {
      scoreIntervalRef.current = setInterval(() => {
        setScore((prevState) => prevState + 1)
      }, 25)
    }
    if (sample < props.item.sample) {
      sampleIntervalRef.current = setInterval(() => {
        setSample((prevState) => prevState + 1)
      }, 25)
    }
    return () => {
      clearInterval(scoreIntervalRef.current)
      clearInterval(sampleIntervalRef.current)
    }
  }, [props.item.sample, props.item.score, score, sample])

  return (
    <CardContainer
      isSelected={props.isSelected}
      onClick={() => selectCardHandler(props.item.name)}
    >
      <CardTitle>{props.item.name}</CardTitle>
      <CircularProgressbarWithChildren
        styles={buildStyles({
          pathColor: props.isSelected ? '#00AEEF' : '#0071C5',
          trailColor: '#D7D7D7',
        })}
        value={score}
      >
        <ProgressBarText isSelected={props.isSelected}>
          {score}%
        </ProgressBarText>
        <NA>{props.item.vsly ? `vsly: ${props.item.vsly}` : 'N/A'}</NA>
      </CircularProgressbarWithChildren>
      <SampleText>Sample: {sample}</SampleText>
    </CardContainer>
  )
}

export default Card

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-self: flex-start;
  width: 10rem;
  margin-right: 2rem;
  height: 16rem;
  padding: 2rem 1.2rem;
  border: 1px solid #ececec;
  border-radius: 8px;
  background-color: ${({ isSelected }) => (isSelected ? '#F2FAFE' : '#fff')};
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${({ isSelected }) =>
    isSelected && 'inset 0 3px 7px 0 rgba(0, 0, 0, 0.1)'};

  &:hover {
    background-color: #f2fafe;
    box-shadow: inset 0 3px 7px 0 rgba(0, 0, 0, 0.1);
  }
  animation: ${OpacityAnimation} 2s;
`
const CardTitle = styled.h3`
  font-weight: 500;
  color: ${({ isSelected }) => (isSelected ? '#00AEEF' : '#0071C5')};
  margin-bottom: 1rem;
`
const ProgressBarText = styled.p`
  font-size: 1.5rem;
  color: ${({ isSelected }) => (isSelected ? '#00AEEF' : '#0071C5')};
`
const SampleText = styled.p`
  margin-top: 1rem;
`

const NA = styled.p`
  font-size: 0.8rem;
  margin-top: 0.2rem;
`
