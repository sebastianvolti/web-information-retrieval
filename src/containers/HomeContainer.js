import React from "react";
import { withRouter } from 'react-router-dom';

import AppFrame from './../components/AppFrame';
import SearchContainer from './Search/SearchContainer';

function HomeContainer() {

  return (
     <div>
        <AppFrame
            header="Bienvenido"
            body={
                <div>
                   <SearchContainer />  
                </div>
            }
        >
        </AppFrame>   
    </div>
  );

  
}

export default withRouter(HomeContainer);
