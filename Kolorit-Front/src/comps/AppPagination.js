import React, { useState, useEffect } from 'react'
import Pagination from '@mui/material/Pagination'
import dataService  from '../services/dataService'


const pageSize = 5
const AppPagination = ({setItems, Items}) => {

    const [page, setPage] = useState(
        {count: 0,
        from: 0,
        to: pageSize
        }
    )

    useEffect(() => {
      dataService.getData({from: page.from, to: page.to, item: Items}).then(response => {
        setPage({...page, count: response.count})
        setItems(response.data)
    })
    
    }, [page.from, page.to])
    
    function handlePage(event, pageNum){
        const from = (pageNum - 1) * pageSize
        const to = (pageNum - 1) * pageSize + pageSize

        setPage({...page, from: from, to: to})
    }

    return (
        <>
            <Pagination className='d-flex justify-content-center'
                color = 'warning'
                count = {Math.ceil(page.count / pageSize)}
                onChange={handlePage}
            />

        </>
    )
}

export default AppPagination