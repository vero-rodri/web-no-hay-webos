import React from 'react';

import { Select } from 'grommet';
import { SELECT_TYPES, SELECT_SORTS, } from '../../constants';
/* import SelectCustom from '../../ui/SelectCustom'; */

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

{/*         //He intentato hacer un componente para no repetirlo, y simplemente llamarlo 2 veces, pero de moemnto no ha funcionado..
 */}        {/* <SelectCustom
          title="Filtrar por"
          content={SELECT_TYPES[props.type]}
          handleChange={handleChangeType}
          choices={Object.values(SELECT_TYPES)}
        /> */}
        <label className="mb-1 p-0">Filtrar por: </label>

        {/* <FormField className="m-0 p-0"> */}
          <Select
            className="m-0 p-2"
            size="small"
            value={SELECT_TYPES[props.type]}
            onChange={handleChangeType}
            options={Object.values(SELECT_TYPES)}
          />

        {/* </FormField> */}
      </div>
      <div className="col-6">
          <label className="mb-1 p-0">Ordenar por: </label>
        {/* <FormField className="m-0 p-0"> */}
          <Select
            className="m-0 p-2"
            size="small"
            value={SELECT_SORTS[props.sort]}
            onChange={handleChangeSort}
            options={Object.values(SELECT_SORTS)}
          />

        {/* </FormField> */}
      </div>
    </div>
  )
}

export default SearchFilters;

