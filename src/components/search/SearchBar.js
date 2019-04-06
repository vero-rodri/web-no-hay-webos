import React from 'react';
import { FormSearch } from 'grommet-icons';
import { Box, TextInput, FormField } from 'grommet'

const SearchBar = (props) => {

  const handleSearch = (event) => {
    console.log("dentrooo")
    props.setSearch(event.target.value);
  }
  
  return (
    <div className="search-bar">
      <Box direction="row" justify="center" >
        <FormSearch size="large" />
          <TextInput placeholder="type here" value={props.search} onChange={handleSearch}/>
      </Box>
    </div>
  )
}

export default SearchBar;
