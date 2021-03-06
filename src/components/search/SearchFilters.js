import React from 'react';

import { Select } from 'grommet';
import { SELECT_TYPES, SELECT_SORTS, } from '../../constants';

const SearchFilters  = (props) => {

  const handleChangeType = (event) => {
    props.onChangeType(event.option);
  }

  const handleChangeSort = (event) => {
    props.onChangeSort(event.option);
  }

  return (

    <div className="row mt-3">
      <div className="col-6">
        <label className="mb-1 p-0">Filtrar por: </label>
          <Select
            className="m-0 p-2"
            size="small"
            value={SELECT_TYPES[props.type]}
            onChange={handleChangeType}
            options={Object.values(SELECT_TYPES)}
          />
      </div>

      <div className="col-6">
          <label className="mb-1 p-0">Ordenar por: </label>
          <Select
            className="m-0 p-2"
            size="small"
            value={SELECT_SORTS[props.sort]}
            onChange={handleChangeSort}
            options={Object.values(SELECT_SORTS)}
          />
      </div>
    </div>
  )
}

export default SearchFilters;

