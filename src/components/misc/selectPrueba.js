import React from 'react';
import Select from 'react-select';

const Ejemplo = () => {


  const opciones = [
    {label:"vero", value: 1, sorpresa: "#"},
    {label:"sergiosdsdadasdadasfdfaddddddddddddddddddddddddddddddddddddddd", value: 2, sorpresa: "%%%"},
    {label:"jesus", value: 3, sorpresa: "t"},
    {label:"rodri", value: 4, sorpresa: "y"}
  ]


  return (
    <Select
      options={opciones}
      isMulti
      isSearchable
    />
  
  )
}

export default Ejemplo;