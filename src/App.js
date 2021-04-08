import React, { useEffect, useState } from 'react'
import CurrencyList from './pages/currenciesList'
import CurrencyDetails from './pages/currencyDetails'
import { Navbar } from 'react-bootstrap'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [selectedRowData, setSelectedRowData] = useState()

  return (

    <Router>
      <div className="App">
        <Navbar className="w-100 mb-3 justify-content-between" bg="dark" variant="dark">
          <Navbar.Brand>Gecko Client</Navbar.Brand>
          <div style={{color: 'grey'}}>Powered by CoinGecko API</div>
        </Navbar>
        <Switch>
          <Route exact path='/'>
            <CurrencyList setSelectedRowData={setSelectedRowData} />
          </Route>
          <Route exact path='/details/:id'>
            <CurrencyDetails id={selectedRowData?.id} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
