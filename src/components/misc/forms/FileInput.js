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
    const { form, label } = this.props;
    const { getFieldProps } = form;
    return (
      <Box margin={{top: "medium"}}>
        <Text margin={{bottom: "xsmall"}}>{label}</Text>
        <TextInput 
          type="file" {...getFieldProps('fileProfile', {
                initialValue: '',
                getValueProps: getFileValueProps,
                getValueFromEvent: getValueFromFileEvent,
                rules: [checkSize],
              })}
        />
      </Box>
    );
  }
}

export default FileInput;

