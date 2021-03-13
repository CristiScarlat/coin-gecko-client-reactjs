import React, {useState}from 'react'
import { Spinner, Pagination } from 'react-bootstrap'
import ResponsiveTable from '../components/table'


export default ({loading, setPageNo, pageNo, list, setSelectedRowData}) => {

    function incremenetPage() {
        setPageNo(pageNo + 1)
    }

    function decrementPage() {
        pageNo > 1 && setPageNo(pageNo - 1)
        return
    }

    function handleTableRowOnCLick(data) {
        console.log(data)
        setSelectedRowData(data)
    }


    return (
        <>
            {list?.length > 0 && <ResponsiveTable
                onRowClick={handleTableRowOnCLick}
                tableData={{
                    header: ['image',
                        'name',
                        'symbol',
                        'current_price',
                        'high_24h',
                        'low_24h'],
                    data: [...list]
                }}
            />}
            {loading && <Spinner animation="border" className="table-spinner" />}
            <div className="table-pages-navigation">
                <Pagination>
                    <Pagination.Prev onClick={decrementPage} />
                    <Pagination.Item>{pageNo}</Pagination.Item>
                    <Pagination.Next onClick={incremenetPage} />
                </Pagination>
            </div>
        </>
    )
}