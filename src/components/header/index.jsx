import React from 'react'
import { Link } from 'gatsby'

import './index.scss'
import { Search } from '../search'

export const Header = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    isRoot && (
      <Search />
      // <h1 className="home-header">
      //   <Link to={`/`} className="link">
      //     {title}
      //   </Link>
      // </h1>
    )
  )
}
