import React, { useState } from 'react'
import { StaticQuery } from 'gatsby'

import { SearchIcon } from './searchIcon'
import { SearchInput } from './searchInput'
import { SearchResult } from './searchResults'

import './index.scss'

export const Search = () => {
  const [searchState, setSearchState] = useState({
    searchedData: [],
    query: '',
  })

  return (
    <StaticQuery
      query={searchQuery}
      render={data => {
        return (
          <section className="search-container">
            <SearchIcon />
            <SearchInput data={data} setSearchState={setSearchState} />
            {searchState.searchedData && (
              <SearchResult searchedData={searchState.searchedData} />
            )}
          </section>
        )
      }}
    />
  )
}

const searchQuery = graphql`
  query SearchQuery {
    allMarkdownRemark(sort: { fields: id }) {
      edges {
        node {
          id
          frontmatter {
            title
            draft
            category
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
