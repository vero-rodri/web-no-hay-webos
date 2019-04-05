import React, { Component } from 'react';
import { Select, FormField } from 'grommet';
import { SELECT_TYPES, SELECT_CATEGORIES, SELECT_SORTS, MIRROR_SELECT_TYPES } from '../../constants';

const SearchFilters  = (props) => {

  const handleChangeType = (event) => {
    console.log("entro en el typo...", event.option)
    props.onChangeType(event.option);
  }

  const handleChangeSort = (event) => {
    console.log("entro en el typo...", event.option)
    props.onChangeSort(event.option);
  }



    //const [value, setValue] = React.useState('medium');
    return (
      <div className="row px-2">
      <div className="col-4">
        <FormField label="Filtrar:">
          <Select
          size="small"
            value={SELECT_TYPES[props.type]}
            onChange={handleChangeType}
            options={Object.values(SELECT_TYPES)}
          />
        </FormField>
      </div>
      <div className="col-4">
        <FormField label="Ordenar:">
          <Select
          size="small"
            value={SELECT_SORTS[props.sort]}
            onChange={handleChangeSort}
            options={Object.values(SELECT_SORTS)}
          />
        </FormField>
      </div>
       {/*  holaaaaaaaa
        <Select
          options={SELECT_TYPES}
          value={'RETO'}
          //onChange={({ option }) => setValue(option)}
        /> */}
      </div>


     /*  const [value, setValue] = React.useState('medium');
  return (
    <Select
      options={['small', 'medium', 'large']}
      value={value}
      onChange={({ option }) => setValue(option)}
    />
  ); */
    )
  }


export default SearchFilters;





/* const [value, setValue] = React.useState('medium');
return (
  <Select
    options={['small', 'medium', 'large']}
    value={value}
    onChange={({ option }) => setValue(option)}
  />
); */