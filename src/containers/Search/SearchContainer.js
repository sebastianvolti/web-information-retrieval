import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { toast } from 'react-toastify';
import Table from './../../components/commons/Table';
import { NewSearch } from './../../services/search.js';

import './style.css';
import { LensTwoTone } from '@material-ui/icons';

function SearchContainer({ agendas, update }) {
  const [data, setData] = useState([{}]);
  const [budget, setBudget] = useState(20000);
  const [currency, setCurrency] = useState('pesos');
  const [operation, setOperation] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);
  const [bathrooms, setBathooms] = useState(null);
  const [departamento, setDepartamento] = useState('TUxVQ1BBUmU3Y2Nj');
  const [filters, setFilters] = useState({
    numberOfBathrooms: null,
    numberOfBedrooms: null,
    size: null,
  });

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleOperationChange = (event) => {
    setOperation(event.target.value);
  };

  const handleBedroomsChange = (event) => {
    setBedrooms(event.target.value);
  };

  function buildData(buildData) {
    console.log("buildData");
    console.log(buildData);
    let items = [];
    buildData.results.forEach((res) => {
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

  //TODO armé super plancha esta función para probar nomas
  function buildPrice(budget) {
    let range1 = budget - (budget % 1000);
    let range2 = range1 - 1000;
    let range3 = range2 - 1000;

    let range_str1 = "";
    let range_str2 = "";
    let range_str3 = "";

    if (opeation = "242073") {
      range_str1 = "alq-" + range1;
      range_str2 = "alq-" + range2;
      range_str3 = "alq-" + range3;
    }
    else {
      range_str1 = "ven-" + range1;
      range_str2 = "ven-" + range2;
      range_str3 = "ven-" + range3;
    }

    return [range_str1, range_str2, range_str3];
  }

  const hanldeConfirmarClick = (event) => {
    let price = budget;
    if (currency === 'usd') {
      price = price * 44;
    }
    const ind_price = buildPrice(price, operation);
    let body = {
        "sort" : [
            { }
        ]
    };

    if (filter.size) {
      body["sort"]["mts"] = "desc";
    }

    if (filter.numberOfBedrooms) {
      body["sort"]["rooms"] = "desc";
    }

    if (filter.numberOfBathrooms) {
      body["sort"]["toilets"] = "desc";
    }

    /*
    for test
    const body = {
        "sort" : [
            { "mts" : "desc" }
        ]
    };

    const url_params = "alq-pocitos-21000";
    */

    ind_price.forEach((ind) => {
      NewSearch(ind, body)
      .then((response) => {
        var actualData = buildData(response.data);
        setData(actualData);
        toast.success('Aquí tus resultados!');
      })
      .catch((error) => {
        console.log(error);
        toast.error('No hay resultados disponibles.');
      });
    });


  };

  return (
    <div className='reservation-form-layout'>
      <div className='reservation-form-title app-subh'>
        <h3>Búsqueda de inmueble</h3>
      </div>
      <div className='reservation-form-body'>
        <Grid container spacing={1}>
          <Grid item md={3} sm={12}>
            <TextField
              id='input-budget'
              type='number'
              label='Presupuesto'
              value={budget}
              onChange={handleBudgetChange}
              className='reservation-input-text'
            />
          </Grid>
          <Grid item md={3} sm={12}>
            <FormControl className='reservation-input-moneda'>
              <InputLabel htmlFor='reservation-form-moneda'>Moneda</InputLabel>
              <Select value={currency} onChange={handleCurrencyChange}>
                <MenuItem value={'usd'}>U$S</MenuItem>
                <MenuItem value={'pesos'}>$</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={2} sm={12}>
            <FormControl
              className='reservation-input-operation'
              style={{ width: '10rem' }}
            >
              <InputLabel htmlFor='reservation-form-operation'>
                Tipo de Operación
              </InputLabel>
              <Select value={operation} onChange={handleOperationChange}>
                <option aria-label='None' value='' />
                <MenuItem value={'242073'}>Alquiler</MenuItem>
                <MenuItem value={'242075'}>Venta</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <br></br>
        <div className='reservation-form-subtitle'>
          Ordenar por:
        </div>
        <Grid container spacing={2}>
          <Grid item md={3} sm={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color='primary'
                  checked={filters.numberOfBathrooms}
                  onChange={(event) =>
                    setFilters({
                      ...filters,
                      numberOfBathrooms: event.target.checked,
                    })
                  }
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label='Cantidad de baños'
            />
          </Grid>
          <Grid item md={3} sm={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color='primary'
                  checked={filters.numberOfBedrooms}
                  onChange={(event) =>
                    setFilters({
                      ...filters,
                      numberOfBedrooms: event.target.checked,
                    })
                  }
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label='Cantidad de habitaciones'
            />
          </Grid>
          <Grid item md={3} sm={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color='primary'
                  checked={filters.size}
                  onChange={(event) =>
                    setFilters({
                      ...filters,
                      size: event.target.checked,
                    })
                  }
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label='Metraje del apartamento'
            />
          </Grid>
        </Grid>
        <br></br>
        <Button
          onClick={hanldeConfirmarClick}
          disabled={!budget || !currency}
          variant='contained'
          color='primary'
          className='btn-confirmar-solicitud'
        >
          CONFIRMAR
        </Button>
        <div>
          <br></br>
          <div className='app-subh'>
            <Table rows={data}> </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SearchContainer);
