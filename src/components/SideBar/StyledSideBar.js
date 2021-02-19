import styled from 'styled-components'

export const SideBarContainer = styled.div`
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  background-color: #003c71;
  padding-top: 3.8rem;
  z-index: 2;

  @media (max-width: 60em) {
    padding-top: 5.8rem;
  }
`
