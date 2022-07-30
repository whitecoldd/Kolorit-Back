import React from 'react'

const dataService = {
    getData: ({ from, to, item }) => {
        return new Promise((resolve, reject) => {
            const data = item?.slice(from, to)
            resolve({
                count: item?.length,
                data: data
            })
        }
    
        )
    }
}

export default dataService