import React from 'react';
import { FormSearch } from 'grommet-icons';
import { Box, TextInput, FormField } from 'grommet'

const SearchBar = (props) => {


  const handleSearch = (event) => {
    props.setSearch(event.target.value);
  }

  return (
    <div>
      <Box direction="row" justify="center" >
        <FormSearch size="large" />
        <FormField>
          <TextInput placeholder="type here" value={props.search} onChange={handleSearch}/>
        </FormField>
      </Box>
    </div>
  )
}

export default SearchBar;
