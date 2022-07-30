import React, { useState, useEffect } from 'react'
import { Image, Nav } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { publicRequest } from '../requests/request'

const ProductDisplay = () => {
  const [Items, setItems] = useState([])
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get("/cat/find");
        setItems(res.data);
      } catch { }
    };
    getItems();
  }, []);
  return (
    <>
      {
        Items?.map(Items =>
          <Link to={`/catalog/${Items.name}`} className='stuff d-flex flex-wrap justify-content-center mb-4 nav-link me-1' eventKey='1'>
            <Image width='100%' height='auto' src={Items.img}></Image>
            <p className='bulb-text'>{Items.name}</p>
          </Link>
        )
      }
    </>
  )
}

export default ProductDisplay