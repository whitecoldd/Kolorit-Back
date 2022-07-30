import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Image } from 'react-bootstrap'
import promo from '../assets/promo.png'
import { publicRequest } from '../requests/request'

const PromosDisplay = () => {

    const [items, setitems] = useState([])
    useEffect(() => {
        const getItems = async () => {
            try {
                const res = await publicRequest.get(`/article/find`)
                setitems(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        getItems()
    }, [])


    return (
        <Container className='d-flex justify-content-center promo-table'>
            {items?.map(items => (
                <Container className="promos d-flex flex-wrap align-content-start me-3">

                    <>
                        <Image fluid src={items.img}></Image>
                        <Container>
                            <h1 className='pt-1'>{items.header}</h1>
                            <p>{items.text}</p>
                        </Container>
                    </>

                </Container>
            ))}
        </Container>
    )
}

export default PromosDisplay