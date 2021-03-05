import React from 'react'
import styled from 'styled-components'

const SideBarIcon = (props) => {
  const Icon = props.icon.name
  return (
    <IconContainer
      // tabSelectHandler is a props which sends id to parent component.
      onClick={() => props.tabSelectHandler(props.icon.id)}
      isSelected={props.icon.isSelected}
    >
      <Icon size={20} />
    </IconContainer>
  )
}

export default SideBarIcon

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: '100%';
  padding: 1rem 0;
  border-top: 1px solid #002d55;

  /* background-color is changing dynamically if it is selected */
  background-color: ${({ isSelected }) => isSelected && '#002d55'};

  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #002d55;
  }

  // last-child must have border-bottom.
  &:last-child {
    border-bottom: 1px solid #002d55;
  }
`
