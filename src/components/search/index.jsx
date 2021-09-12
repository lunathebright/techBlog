import React from 'react'
import { SearchIcon } from './searchIcon'
import { SearchInput } from './searchInput'

import './index.scss'

export const Search = () => {
  const [isClicked, setIsClicked] = React.useState(false)

  return (
    <section
      className={isClicked ? 'search-container active' : 'search-container'}
    >
      {isClicked && <SearchInput />}
      <SearchIcon setIsClicked={setIsClicked} />
    </section>
  )
}
