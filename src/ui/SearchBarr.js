import React from 'react';
import { FormSearch } from 'grommet-icons';
import { Box, TextInput, FormField } from 'grommet';
import { withSearchConsumer } from '../context/SearchStore';

const SearchBarr = (props) => {

  const handleSearch = (event) => {
    props.onSearchChange(event.target.value);
  }
  
  return (
    <div className="search-barr d-flex">
      <FormSearch size="large" />
      <TextInput placeholder="type here" value={props.search} onChange={handleSearch}/>
    </div>
  )
}

export default withSearchConsumer(SearchBarr);
