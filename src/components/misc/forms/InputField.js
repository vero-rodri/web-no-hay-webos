import React, { Component } from 'react';
import { TextInput, Box, Text  } from 'grommet';

class InputField extends Component {

  handleChange = (event) => {
    const name = this.props.name;
    this.props.handleChange(name, event.target.value)
  }

  render() {
    const {
      label,     
      value,
      //icon,    
      placeholder,
      errors,
      onblur,
      type,
      onChange,
      //allowClear    //no sé cómo meterlo en grommet
    } = this.props;

    const hasErrors = errors && errors.length > 0;

    return (
      <Box margin={{top: "medium"}}>
        <Text margin={{bottom: "xsmall"}}>{label}</Text>
        <TextInput 
          align="center"
          margin=""
          onChange={onChange}
          value={value}
          {...(type ? { type } : null)}
          {...(placeholder ? { placeholder } : null)}
          {...(onblur ? { onBlur: onblur } : null)}
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
    );
  }
}

export default InputField;