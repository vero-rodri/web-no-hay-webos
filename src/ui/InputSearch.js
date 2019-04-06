import React from 'react';
import { FormSearch , View} from 'grommet-icons';
import { Box, TextInput, FormField, Button } from 'grommet';
import { withSearchConsumer } from '../context/SearchStore';

const InputSearch = (props) => {

  const handleSearch = (event) => {
    props.onSearchChange(event.target.value);
  }

  return (
    <Box
    width="small"
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
      // type={reveal ? "text" : "password"}
      value={props.search}
      onChange={handleSearch}
      //icon={<View size="medium" />}
    />
    <Button
      icon={<FormSearch size="medium" />}
      
    />
    </Box>

  )
}

export default withSearchConsumer(InputSearch);


