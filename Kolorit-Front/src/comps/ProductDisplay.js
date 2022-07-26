import React, { useState, useEffect } from 'react'
import { Image, Nav } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { publicRequest } from '../requests/request'

const ProductDisplay = () => {
  const [Items, setItems] = useState([])
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get("api/cat/find");
        setItems(res.data);
      } catch { }
    };
    getItems();
  }, []);
  return (
    <>
      {
        Items?.slice(0,8).map(Items =>
          <Link to={`/catalog/${Items.name}`} className='stuff d-flex flex-wrap justify-content-center mb-4 nav-link me-1 pb-0 pt-2' eventKey='1'>
            <Image width='100%' height='70vh' src={Items.img}></Image>
            <p className='bulb-text text-center d-flex flex-wrap'>{Items.name}</p>
          </Link>
        )
      }
    </>
  )
}

export default ProductDisplay