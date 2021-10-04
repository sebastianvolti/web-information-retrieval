import React from "react";

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function SelectorDepartamento({departamento, setDepartamento}){

  const handleChangeDepartamento = (event) => {
    setDepartamento(event.target.value);
  } 

  return(
    <FormControl className="reservation-input-text">
      <InputLabel htmlFor="input-departamento">Departamento</InputLabel>
      <Select          
        value={departamento}
        onChange={handleChangeDepartamento}
        inputProps={{
          name: 'departamento',
          id: 'input-departamento',
        }}
      >
        <MenuItem value={"ARTIGAS"}>Artigas</MenuItem>
        <MenuItem value={"CANELONES"}>Canelones</MenuItem>
        <MenuItem value={"CERRO_LARGO"}>Cerro Largo</MenuItem>
        <MenuItem value={"COLONIA"}>Colonia</MenuItem>
        <MenuItem value={"DURAZNO"}>Durazno</MenuItem>
        <MenuItem value={"FLORES"}>Flores</MenuItem>
        <MenuItem value={"FLORIDA"}>Florida</MenuItem>
        <MenuItem value={"LAVALLEJA"}>Lavalleja</MenuItem>
        <MenuItem value={"MALDONADO"}>Maldonado</MenuItem>
        <MenuItem value={"TUxVQ1BBUmU3Y2Nj"}>Montevideo</MenuItem>
        <MenuItem value={"PAYSANDU"}>Paysandú</MenuItem>
        <MenuItem value={"RIO_NEGRO"}>Río Negro</MenuItem>
        <MenuItem value={"RIVERA"}>Rivera</MenuItem>
        <MenuItem value={"ROCHA"}>Rocha</MenuItem>
        <MenuItem value={"SALTO"}>Salto</MenuItem>
        <MenuItem value={"SAN_JOSE"}>San José</MenuItem>
        <MenuItem value={"SORIANO"}>Soriano</MenuItem>
        <MenuItem value={"TACUAREMBO"}>Tacuarembó</MenuItem>
        <MenuItem value={"TREINTA_Y_TRES"}>Treinta y Tres</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectorDepartamento;