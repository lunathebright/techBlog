import React from 'react'
import { SearchIcon } from './searchIcon'
import { SearchInput } from './searchInput'

import './index.scss'

export const Search = () => {
  const body = document.querySelector('body')
  const color = body.className === 'light' ? 'rgb(88, 124, 185)' : '#fbc2eb'

  return (
    <section className="search-container">
      <SearchIcon color={color} />
      <SearchInput />
    </section>
  )
}
