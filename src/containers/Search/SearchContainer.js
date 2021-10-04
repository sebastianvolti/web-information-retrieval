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
  const [departamento, setDepartamento] = useState("TUxVQ1BBUmU3Y2Nj");

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  }

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
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
    let price = budget + "-" + budget;
    return price;
  }

  const hanldeConfirmarClick = (event) => {
    const params = {
      price: buildPrice(budget),
      currency: currency,
      q: 'apartamento',
      city: departamento,
    }

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

     <Grid container spacing={2}>
          <Grid item md={3} sm={12}>
              <TextField id="input-budget" type="number" label="Presupuesto" value={budget} onChange={handleBudgetChange} className="reservation-input-text"/>
          </Grid>
          <Grid item md={5} sm={12}>
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
          <Grid item md={4} sm={12}>
              <SelectorDepartamento departamento={departamento} setDepartamento={setDepartamento} /> 
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
