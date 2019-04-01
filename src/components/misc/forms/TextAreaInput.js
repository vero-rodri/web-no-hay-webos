import React, { Component } from 'react';
import { TextArea, Box, Text  } from 'grommet';

class TextAreaInput extends Component {

  handleChange = (event) => {
    const name = this.props.name;
    this.props.handleChange(name, event.target.value)
  }

  render() {
    const {
      label,     
      value,
      placeholder,
      errors,
      onblur,
      type,
      onChange,
    } = this.props;

    const hasErrors = errors && errors.length > 0;

    return (
      <Box margin={{top: "medium"}}>
        <Text margin={{bottom: "xsmall"}}>{label}</Text>
        <TextArea 
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

export default TextAreaInput;