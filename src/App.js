import React, { useEffect, useState } from 'react'
import { getConinsMarket } from './services/api'
import CurrencyList from './pages/currenciesList'
import CurrencyDetails from './pages/currencyDetails'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const [list, setList] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState()
  const [pageNo, setPageNo] = useState(1)


  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const res = await getConinsMarket({ vs_currency: 'eur', order: 'market_cap_desc', per_page: 10, page: pageNo })
      if (res.data[0] === list[0]) {
        console.log("not any more")
        setHasMore(false)
        return
      }
      setList([...res.data])
      setLoading(false)
    }
    fetchData()
  }, [pageNo])

  useEffect(() => {
    console.log(selectedRowData)

  }, [selectedRowData])

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <CurrencyList list={list} loading={loading} hasMore={hasMore} pageNo={pageNo} setPageNo={setPageNo} setSelectedRowData={setSelectedRowData} />
        </Route>
        <Route exact path='/details/:id'>
          <CurrencyDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
