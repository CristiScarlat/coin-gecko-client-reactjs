import React, { useEffect, useState, useRef } from 'react'
import { getCoinDetails } from '../services/api'
import { Spinner } from 'react-bootstrap'
import ResponsiveTable from '../components/table'

const CurrencyDetails = ({id}) => {
    const [coinDetails, setCoinDetails] = useState()
    const [loading, setLoading] = useState(false)
    if(id){
        localStorage.setItem('coinId', id)
    }

    useEffect(() => {
        async function fetchData(coinId) {
            setLoading(true)
            const res = await getCoinDetails(coinId)
            setCoinDetails(res.data)
            setLoading(false)
        }
        if(!id){
            const storedID = localStorage.getItem('coinId')
            fetchData(storedID)
        } else {
            fetchData(id)
        }
    }, [id])

    function getTableData(){
        const header = ['hashing_algorithm', 'market_cap_rank', 'genesis_date']
        let data = [coinDetails]
        const tData = {header, data}
        return tData
    }

    return (
        <>
        {!loading && coinDetails ? <div>
        <img src={coinDetails.image.small} /><span className="details-title ml-2">{coinDetails.name}</span>
        <div className="mt-2 mb-4" dangerouslySetInnerHTML={{ __html: coinDetails.description.en }} />
        <ResponsiveTable tableData={getTableData()}/>
        {coinDetails.links.homepage.map(hp => <a href={hp}>{hp}</a>)}
    </div> : null}
    {loading && <Spinner animation="border" className="table-spinner" variant="primary"/>}
    </>
    )  
}

export default CurrencyDetails