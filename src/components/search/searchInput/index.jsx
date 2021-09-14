import React from 'react'

import './index.scss'

export const SearchInput = () => {
  const handleChange = e => {
    console.log(e.target.value)
  }

  return (
    <div className="search-input">
      <input onChange={handleChange} type="text" />
    </div>
  )
}
