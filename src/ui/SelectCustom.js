/* import React from 'react';
import { Select, FormField } from 'grommet';

const SelectCustom = (props) => {
  
  const { title, content, handleChange, choices } = props;

  const handleChangeSelect = (event) => {
    console.log("a nivel de select")
    handleChange(event);
  }
  
  return (
    <FormField className="m-0 p-0">
      <label className="mb-1 p-0">{title}</label>
      <Select
        className="m-0 p-1"
        size="small"
        value={content}
        handleChange={handleChangeSelect}
        options={choices}
      />
    </FormField>
  )
}

export default SelectCustom;
 */