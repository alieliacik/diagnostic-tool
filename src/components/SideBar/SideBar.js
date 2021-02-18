import React, { useState } from 'react'
import { SideBarContainer } from './StyledSideBar'
import SideBarIcon from './SideBarIcon'
import {
  AiFillPushpin,
  AiOutlineBarChart,
  AiOutlineMail,
  AiOutlineReload,
} from 'react-icons/ai'
import { FaShapes } from 'react-icons/fa'

const SideBar = () => {
  const [allIcons, setAllIcons] = useState([
    { id: 1, name: AiFillPushpin, isSelected: false },
    { id: 2, name: AiOutlineBarChart, isSelected: false },
    { id: 3, name: AiOutlineMail, isSelected: false },
    { id: 4, name: FaShapes, isSelected: true },
    { id: 5, name: AiOutlineReload, isSelected: false },
  ])

  const tabSelectHandler = (id) => {
    const modifiedAllIcons = allIcons.map(
      (icon) =>
        id === icon.id
          ? { ...icon, isSelected: true }
          : { ...icon, isSelected: false }

      // or more readable way...
      // if (id === icon.id) {
      //   return { ...icon, isSelected: true }
      // } else {
      //   return { ...icon, isSelected: false }
      // }
    )
    setAllIcons(modifiedAllIcons)
  }

  return (
    <SideBarContainer>
      {allIcons.map((icon) => (
        <SideBarIcon
          key={icon.id}
          icon={icon}
          tabSelectHandler={tabSelectHandler}
        />
      ))}
    </SideBarContainer>
  )
}

export default SideBar
