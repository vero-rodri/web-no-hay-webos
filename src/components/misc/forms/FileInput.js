import React, { Component } from 'react';
import { Box, Text, TextInput } from 'grommet';
import { checkSize } from '../../../utils/formValidators';

function getFileValueProps(value) {
  if (value && value.target) {
    return {
      value: value.target.value,
    };
  }
  return {
    value,
  };
}

function getValueFromFileEvent({ target }) {
  return {
    target,
  };
}

class FileInput extends Component {
  render() {
    const { form, label, name } = this.props;
    const { getFieldProps, getFieldError } = form;
    return (
      <Box margin={{top: "medium"}}>
        <Text margin={{bottom: "xsmall"}}>{label}</Text>
        <TextInput 
          type="file" {...getFieldProps(name, {
                initialValue: '',
                getValueProps: getFileValueProps,
                getValueFromEvent: getValueFromFileEvent,
                rules: [checkSize],
              })}
        />
          {getFieldError(name) && getFieldError(name).map((error, index) => {
            return (
            <Text
              key={index} 
              size="small" 
              color="status-error" 
              margin={{top: "xsmall", left:"small"}}>
              {error}
            </Text>
            )}
          )}

      </Box>
    );
  }
}

export default FileInput;

