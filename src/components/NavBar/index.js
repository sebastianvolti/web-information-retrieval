import React from "react";
import { withRouter } from 'react-router-dom';

// Redux
import Button from '@material-ui/core/Button';

// Style
import "./style.css";


function NavBar({ history }) {

  const handleMonitor = () => {
    history.replace("/monitor")
  }  

  const handleInit = () => {
    history.replace("/inicio")
  } 

  return (
    <nav className="nav-bar">
      <div>
        <h2>Prototipo proyecto webir</h2>
      </div>
      <Button onClick={handleInit}>Pagina Principal</Button>
      <Button onClick={handleMonitor}>Monitor</Button>
    </nav>
  );

}

export default withRouter(NavBar);
