import React from 'react'

const SearchField = ({ searchText, handleSearchText }) => {
  return (
    <div>find countries <input type="text" value={searchText} onChange={handleSearchText} /></div>
  )
}

export default SearchField