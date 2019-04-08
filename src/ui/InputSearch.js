import React from 'react';
import { FormSearch } from 'grommet-icons';
import { Box, TextInput, Button } from 'grommet';
import { withSearchConsumer } from '../context/SearchStore';

const InputSearch = (props) => {

  const handleSearch = (event) => {
    props.onSearchChange(event.target.value);
  }

  return (
    <Box className="my-search-bar"
    direction="row"
    margin="xsmall"
    align="center"
    round="large"
    border
    size=""
    >
    <TextInput
      plain
      placeholder="Buscar..."
      value={props.search}
      onChange={handleSearch}
    />
    <Button
      icon={<FormSearch size="medium" />}
      
    />
    </Box>

  )
}

export default withSearchConsumer(InputSearch);


