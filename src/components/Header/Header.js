import React from 'react'
import {
  HeaderContainer,
  Logo,
  UserInfo,
  HeaderIcons,
  IconContainer,
} from './StyledHeader'
import { RiListSettingsFill } from 'react-icons/ri'
import {
  AiOutlineDownload,
  AiOutlinePrinter,
  AiOutlineQuestionCircle,
  AiOutlineLogout,
} from 'react-icons/ai'

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>Diagnostic Tool</Logo>
      <HeaderIcons>
        <UserInfo>Logged in as General User</UserInfo>
        {/* Creating just one IconContainer like I did in 'Sidebar' container is another solution here. */}
        <IconContainer>
          <RiListSettingsFill size={18} />
        </IconContainer>
        <IconContainer>
          <AiOutlineDownload size={18} />
        </IconContainer>
        <IconContainer>
          <AiOutlinePrinter size={18} />
        </IconContainer>
        <IconContainer>
          <AiOutlineQuestionCircle size={18} />
        </IconContainer>
        <IconContainer>
          <AiOutlineLogout size={18} />
        </IconContainer>
      </HeaderIcons>
    </HeaderContainer>
  )
}

export default Header
