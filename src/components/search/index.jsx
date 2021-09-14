import React from 'react'
import { SearchIcon } from './searchIcon'
import { SearchInput } from './searchInput'

import './index.scss'

export const Search = () => {
  const [isClicked, setIsClicked] = React.useState(false)

  const handleClickWindow = () => {
    console.log('window')
  }

  React.useEffect(() => {
    console.log(isClicked)
    if (isClicked) {
      window.addEventListener('click', handleClickWindow)
    } else if (!isClicked) {
      window.removeEventListener('click', handleClickWindow)
    }
  }, [isClicked])

  return (
    <section
      className={isClicked ? 'search-container active' : 'search-container'}
    >
      {isClicked && <SearchInput />}
      <SearchIcon setIsClicked={setIsClicked} />
    </section>
  )
}
