import React from 'react'
import { Link } from 'gatsby'

import './index.scss'

export const SearchResult = ({ searchedData }) => {
  return (
    <ul className="search-results">
      {searchedData.map(({ node }) => {
        const { slug } = node.fields
        const { title, category, date } = node.frontmatter

        return (
          <Link to={slug} key={slug} className="link">
            <li className="search-result">
              <p className="result-title">{title}</p>
              <span className="result-info">{`${category} | ${
                date.split('T')[0]
              }`}</span>
            </li>
          </Link>
        )
      })}
    </ul>
  )
}
