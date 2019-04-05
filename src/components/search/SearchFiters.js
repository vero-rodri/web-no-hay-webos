import React from 'react';
import { Select, FormField } from 'grommet';
import { SELECT_TYPES, SELECT_SORTS, } from '../../constants';

const SearchFilters  = (props) => {

  const handleChangeType = (event) => {
    props.onChangeType(event.option);
  }

  const handleChangeSort = (event) => {
    props.onChangeSort(event.option);
  }

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
    </div>
  )
}

export default SearchFilters;

