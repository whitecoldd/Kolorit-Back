import React from 'react'
import {Link} from 'react-router-dom'

const BrandsItemDisplay = ({ item }) => {
    return (
        <>
            <Link to={`/brandscatalog/${item.name}`} className='black pe-5 ps-5 me-5 ms-5' >{item.name} ({item.qty})</Link>
        </>
    )
}
export default BrandsItemDisplay