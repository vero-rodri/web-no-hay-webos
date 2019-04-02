import React, { Component } from 'react';
import { Select, Box, Text  } from 'grommet';

class SelectInput extends Component {
  render() {
    const { 
      onChange,
      errors,
      options,
      value,
      correlationNames
    } = this.props;

    const hasErrors = errors && errors.length > 0;
    return (
      <Box margin={{top: "medium"}}>
      <Text margin={{bottom: "xsmall"}}>Tipo de reto:</Text>
      <Select
        onChange={onChange}
        options={options}
        value={correlationNames[value]}
        children={(option) => {
          return correlationNames[option]
        }}
      />
      {hasErrors &&
        errors.map((error, index) => (
          <Text
            key={index} 
            size="small" 
            color="status-error" 
            margin={{top: "xsmall", left:"small"}}>
            {error}
          </Text>
        ))}
      </Box>
    )
  }
}

export default SelectInput;