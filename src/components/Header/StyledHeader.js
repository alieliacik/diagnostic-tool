import styled from 'styled-components'

export const HeaderContainer = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem 0 5rem;
  background-color: #0171c4;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
  z-index: 1;
`
export const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
`
export const UserInfo = styled.h3`
  display: flex;
  align-items: center;
  color: #78b4e0;
  border-right: 1px solid #78b4e0;
  padding-right: 10px;
  height: 25px;
`
export const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
`
export const IconContainer = styled.div`
  margin: 0 1rem;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    color: #78b4e0;
  }
`
