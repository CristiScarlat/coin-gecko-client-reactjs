import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const ResponsiveTable = ({tableData, onRowClick}) => {
    console.log('>>>table>>>>', tableData)
    function renderTableRowContent(data) {
        return tableData.header.map(h => {
            console.log(h, data[h])
            return <td key={h}> {h === 'image' ? <Link to={`/details/${data.id}`}><img src={data[h]} width={30}/></Link> : data[h]} </td>
        })
    }

    return (<Table striped bordered hover responsive>
        <thead>
          <tr>
            {tableData?.header?.map((head, index) => <th key={head} className="table-header">{head}</th>)}
          </tr>
        </thead>
        <tbody>
          {tableData?.data?.map((data, index) => (<tr key={data.id} onClick={() => onRowClick(data)}>{renderTableRowContent(data)}</tr>))}
        </tbody>
      </Table>)
}

export default ResponsiveTable