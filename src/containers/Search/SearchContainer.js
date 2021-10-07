import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { toast } from 'react-toastify';
import SelectorDepartamento from './../../components/composite/SelectorDepartamento';
import Table from './../../components/commons/Table';
import { NewSearch } from './../../services/search.js'

import "./style.css";

function SearchContainer({ agendas, update }) {

  const [data, setData] = useState([{}]);
  const [budget, setBudget] = useState(20000);
  const [currency, setCurrency] = useState("pesos");
  const [operation, setOperation] = useState("242073");
  const [bedrooms, setBedrooms] = useState("-");
  const [departamento, setDepartamento] = useState("TUxVQ1BBUmU3Y2Nj");

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  }

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  }

  const handleOperationChange = (event) => {
    setOperation(event.target.value);
  }

  const handleBedroomsChange = (event) => {
    setBedrooms(event.target.value);
  }
  
  function buildData(buildData){  
    let items = [];
    buildData.results.forEach(res => {
      const item = {
        id: res.id,
        title: res.title,
        price: res.price,
        permalink: res.permalink,
      };
      items.push(item);
    });
  
    return items;
  }


  //TODO armar lógica que soporte rangos por encima y debajo del precio indicado
  function buildPrice(budget){  
    let price = (budget * 0.9) + "-" + budget;
    return price;
  }

  const hanldeConfirmarClick = (event) => {
    let price = budget;
    if (currency === "usd") {
      price = price * 44;
    }

    const configParams = {
      price: buildPrice(price),
      q: 'apartamento',
      city: departamento,
      sort: 'price_desc',
      BEDROOMS: (bedrooms === "-") ? undefined : bedrooms,
      OPERATION: operation
    };

    console.log("configParams");
    console.log(configParams);

    const params = {};
    Object.entries(configParams).forEach(([key, value]) => {
      if (key && value) {
        params[key] = value;
      }
    });

    console.log("params");
    console.log(params);



    NewSearch(params)
    .then((response) => {
      var actualData = buildData(response.data);
      setData(actualData);
      toast.success("Aquí tus resultados!");

    })
    .catch(error => {
      console.log(error);
      toast.error("No hay resultados disponibles.");
    });
    
  }

  return (
    <div className="reservation-form-layout">
     <div className="reservation-form-title app-subh">
     <h3>Búsqueda de inmueble</h3>
     </div> 
     <div className="reservation-form-body">

     <Grid container spacing={1}>
          <Grid item md={3} sm={12}>
              <TextField id="input-budget" type="number" label="Presupuesto" value={budget} onChange={handleBudgetChange} className="reservation-input-text"/>
          </Grid>
          <Grid item md={3} sm={12}>
          <FormControl className="reservation-input-moneda">
              <InputLabel htmlFor="reservation-form-moneda">Moneda</InputLabel>
              <Select          
                value={currency}
                onChange={handleCurrencyChange}
              >
                <MenuItem value={"usd"}>U$S</MenuItem>
                <MenuItem value={"pesos"}>$</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={2} sm={12}>
            <FormControl className="reservation-input-operation">
              <InputLabel htmlFor="reservation-form-operation">Tipo de Operación</InputLabel>
              <br></br>
              <Select          
                value={operation}
                onChange={handleOperationChange}
              >
                <MenuItem value={"242073"}>Alquiler</MenuItem>
                <MenuItem value={"242075"}>Venta</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={4} sm={12}>
              <SelectorDepartamento departamento={departamento} setDepartamento={setDepartamento} /> 
          </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={2}>
        <Grid item md={2} sm={12}>
          <FormControl className="reservation-input-dormitorios">
            <InputLabel htmlFor="reservation-form-dormitorios">Dormitorios</InputLabel>
            <br></br>
            <Select          
              value={bedrooms}
              onChange={handleBedroomsChange}
            >
              <MenuItem value={"-"}>-</MenuItem>
              <MenuItem value={"[0-0]"}>Monoambiente</MenuItem>
              <MenuItem value={"[1-1]"}>1 Dormitorio</MenuItem>
              <MenuItem value={"[2-2]"}>2 Dormitorios</MenuItem>
              <MenuItem value={"[3-3]"}>3 Dormitorios</MenuItem>
              <MenuItem value={"[4-*]"}>4 o más</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br></br>
      <Button onClick={hanldeConfirmarClick} variant="contained" color="primary" className="btn-confirmar-solicitud">
          CONFIRMAR
      </Button>
      <div>
        <br></br>
        <div className="app-subh">
          <Table rows={data}> </Table>
        </div> 
      </div>

     </div> 
    </div>
  );
}


export default withRouter(SearchContainer);
