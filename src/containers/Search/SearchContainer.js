import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { TextField, Chip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { AddCircle, Filter1, Filter2, Filter3 } from '@material-ui/icons';
import { toast } from 'react-toastify';
import Table from './../../components/commons/Table';
import { NewSearch } from './../../services/search.js';

import './style.css';

const FILTERS_ID = {
  bathrooms: '1',
  rooms: '2',
  size: '3',
};
function SearchContainer({ agendas, update }) {
  const [showFilters, setShowFilters] = useState([]);
  const [data, setData] = useState([{}]);
  const [budget, setBudget] = useState(20000);
  const [currency, setCurrency] = useState('pesos');
  const [operation, setOperation] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);
  const [bathrooms, setBathooms] = useState(null);
  const [departamento, setDepartamento] = useState('TUxVQ1BBUmU3Y2Nj');

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
    let items = [];
    console.log(buildData)
    buildData.hits.hits.forEach((res) => {
      
      const item = {
        rooms: res._source.rooms,
        mts: res._source.mts+"mts",
        baths: res._source.baths,
        price: res._source.price+"$",
        permalink: res._source.link,
      };
      items.push(item);
    });

    return items;
  }

  //TODO armar lógica que soporte rangos por encima y debajo del precio indicado
  function buildPrice(budget) {
    let price =  (budget - (budget%1000)) -1000;
    return operation+"-"+price;
  }

  const hanldeConfirmarClick = (event) => {let price = budget;
    if (currency === 'usd') {
      price = price * 44;
    }
    const ind_price = buildPrice(price, operation);
    let body = {
        "sort" : [
        ]
    };

   
    
    showFilters.forEach(elem => {
      if (elem === FILTERS_ID.bathrooms){
        body["sort"].push({"baths" : "desc"});
      }else if (elem === FILTERS_ID.rooms){
        body["sort"].push({"rooms" : "desc"});
      }else{
        body["sort"].push({"mts" : "desc"});
      }
    })

    

        NewSearch(ind_price, body)
        .then((response) => {
          var actualData = buildData(response.data);
          setData(actualData);
          toast.success('Aquí tus resultados!');
        })
        .catch((error) => {
          console.log(error);
          toast.error('No hay resultados disponibles.');
        });
  };

  const addFilter = (filterId) => {
    const newFilters = [...showFilters];
    newFilters.push(filterId);
    setShowFilters(newFilters);
  };

  const deleteFilter = (filterId) => {
    const newFilters = showFilters.filter((filter) => filter != filterId);
    setShowFilters(newFilters);
  };

  const getChip = (filterId, index) => {
    let filterIndex = <Filter1 color='primary' />;
    if (index === 1) {
      filterIndex = <Filter2 color='primary' />;
    } else if (index === 2) {
      filterIndex = <Filter3 color='primary' />;
    }
    if (filterId === FILTERS_ID.bathrooms) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          {filterIndex}
          <Chip
            label='Cantidad de baños'
            color='primary'
            variant='outlined'
            onDelete={() => deleteFilter(FILTERS_ID.bathrooms)}
            style={{ marginLeft: '1rem' }}
          />
        </div>
      );
    } else if (filterId === FILTERS_ID.rooms) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          {filterIndex}
          <Chip
            label='Cantidad de habitaciones'
            color='primary'
            variant='outlined'
            onDelete={() => deleteFilter(FILTERS_ID.rooms)}
            style={{ marginLeft: '1rem' }}
          />
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          {filterIndex}
          <Chip
            label='Metraje'
            color='primary'
            variant='outlined'
            onDelete={() => deleteFilter(FILTERS_ID.size)}
            style={{ marginLeft: '1rem' }}
          />
        </div>
      );
    }
  };
  return (
    <div className='reservation-form-layout'>
      <div className='reservation-form-title app-subh'>
        <h3>Búsqueda de inmueble</h3>
      </div>
      <br></br>
      <br></br>
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
                <MenuItem value={'alq'}>Alquiler</MenuItem>
                <MenuItem value={'ven'}>Venta</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <br></br>

        <div
          className='reservation-form-subtitle'
          style={{ marginBottom: '1rem' }}
        >
          Ordenar por:
        </div>
        <Grid item spacing={2}>
          {showFilters.length > 0 && (
            <Grid item md={5} sm={12}>
              {showFilters.map((filterId, i) => {
                return getChip(filterId, i);
              })}
            </Grid>
          )}
          <Grid
            item
            md={6}
            sm={12}
            style={{
              display: 'flex',
            }}
          >
            {!showFilters.includes(FILTERS_ID.bathrooms) && (
              <Button
                variant='contained'
                color='primary'
                endIcon={<AddCircle />}
                onClick={() => addFilter(FILTERS_ID.bathrooms)}
                style={{
                  marginRight: '1rem',
                }}
              >
                Cantidad de baños
              </Button>
            )}
            {!showFilters.includes(FILTERS_ID.rooms) && (
              <Button
                variant='contained'
                color='primary'
                endIcon={<AddCircle />}
                onClick={() => addFilter(FILTERS_ID.rooms)}
                style={{
                  marginRight: '1rem',
                }}
              >
                Cantidad de habitaciones
              </Button>
            )}
            {!showFilters.includes(FILTERS_ID.size) && (
              <Button
                variant='contained'
                color='primary'
                endIcon={<AddCircle />}
                onClick={() => addFilter(FILTERS_ID.size)}
              >
                Metraje
              </Button>
            )}
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
