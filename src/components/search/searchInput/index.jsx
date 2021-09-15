import React from 'react'

import './index.scss'

export const SearchInput = ({ setSearchState, data }) => {
  const handleChange = e => {
    const query = e.target.value
    if (query === '') {
      setSearchState({
        searchedData: null,
        query: '',
      })
      return
    }

    const posts = data.allMarkdownRemark.edges || []

    const searchedData = posts.filter(post => {
      const { title, draft } = post.node.frontmatter
      return (
        !draft && title && title.toLowerCase().includes(query.toLowerCase())
      )
    })

    setSearchState({
      searchedData,
      query,
    })
  }

  return (
    <div className="search-input">
      <input onChange={handleChange} type="text" />
    </div>
  )
}
