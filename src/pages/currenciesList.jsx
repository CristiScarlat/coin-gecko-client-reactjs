import React, { useState, useEffect }from 'react'
import { Pagination } from 'react-bootstrap'
import ResponsiveTable from '../components/table'
import { getCoinsMarket } from '../services/api'
import { Spinner } from 'react-bootstrap'


export default ({ setSelectedRowData}) => {
    const storedPageNo = sessionStorage.getItem('pageNo');
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [pageNo, setPageNo] = useState((Number(storedPageNo) === 0) ? 1 : Number(storedPageNo))

    useEffect(() => {
        async function fetchData() {
          setLoading(true)
          const res = await getCoinsMarket({ vs_currency: 'eur', order: 'market_cap_desc', per_page: 10, page: pageNo })
          if (res.data[0] === list[0]) {
            setHasMore(false)
            return
          }
          setList([...res.data])
          setLoading(false)
        }
        fetchData()
        sessionStorage.setItem('pageNo', String(pageNo))
      }, [pageNo])

    function incremenetPage() {
        setPageNo(Number(storedPageNo) + 1)
    }

    function decrementPage() {
        pageNo > 1 && setPageNo(Number(storedPageNo) - 1)
        return
    }

    function handleTableRowOnCLick(data) {
        setSelectedRowData(data)
    }

    function buildTableData() {
        const obj = {
            header: ['image',
                'name',
                'symbol',
                'current_price',
                'high_24h',
                'low_24h'],
            data: list
        }
        return obj
    }


    return (
        <>
            {list?.length > 0 && <>
            <ResponsiveTable
                onRowClick={handleTableRowOnCLick}
                tableData={buildTableData()}
                className="table-list"
            />
            <div className="list-tip w-100">Click images for details</div>
            </>}

            <div className="table-pages-navigation"> 
                <Pagination>
                    <Pagination.Prev onClick={decrementPage} />
                    <Pagination.Item>{pageNo}</Pagination.Item>
                    <Pagination.Next onClick={incremenetPage} />
                </Pagination>
            </div>
            {loading && <Spinner animation="border" className="table-spinner" variant="primary"/>}
        </>
    )
}