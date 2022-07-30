import React from 'react'

const BrandsItemDisplay = ({ item }) => {
    return (
        <>
            <p className='black'>{item.name} ({item.qty})</p>
        </>
    )
}
export default BrandsItemDisplay