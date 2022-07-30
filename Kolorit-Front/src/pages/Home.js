import React, { useEffect, useState } from 'react'
import { Nav, Container, Image, Button, Row, Col, Tab, Badge } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { MenuItems } from '../comps/MenuItems'
import MenuItemsDisplay from '../comps/MenuItemsDisplay'
import slider from '../assets/slider.png'
import sale from '../assets/salesprod.png'
import buy from '../assets/tocart.png'
import tick1 from '../assets/tick1.png'
import tick2 from '../assets/tick2.png'
import tick3 from '../assets/tick3.png'
import tick4 from '../assets/tick4.png'
import { Products } from '../comps/Products'
import { Link } from 'react-router-dom'
import ItemModel from '../comps/ItemModel'
import ProductDisplay from '../comps/ProductDisplay'
import Marquee from "react-fast-marquee";
import CardsItem from '../comps/CardsItem'
import MenuOpenItemDisplay from '../comps/MenuOpenItemDisplay'
import Countdown from 'react-countdown'
import PromosDisplay from '../comps/PromosDisplay'
import axios from "axios"
import { publicRequest, userRequest } from '../requests/request'
import AppPagination from '../comps/AppPagination'
import Slider from '../comps/Slider'
import ItemOfDay from '../comps/ItemOfDay'
import { useTranslation } from 'react-i18next'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import "react-alice-carousel/lib/scss/alice-carousel.scss";
export default function Home(props) {
  const { t } = useTranslation()
  const { onAdd, onRemoveFromPage, addToCompare, removeFromCompare, selectedItems, cartItems } = props
  const location = useLocation()
  const [Items, setItems] = useState([])
  // const [prods, setProds] = useState([])
  console.log(location)

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`/items/find?new=new`)
        setItems(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getItems()
  }, [])
  // const [Product, setProduct] = useState([])
  // useEffect(() => {
  //   const getItems = async () => {
  //     try {
  //       const res = await publicRequest.get(`/order/`)
  //       setProduct(res.data)
  //       console.log(res.data)
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  //   getItems()
  // }, [])

  const handleDragStart = (e) => e.preventDefault();


  return (
    <>
      <Container className="d-flex">
        <Container className='menu-space mt-3'>
          <MenuItemsDisplay></MenuItemsDisplay>
        </Container>
        <Container className='me-1 mt-3 carousel-mine'>
          <Slider />
        </Container>
      </Container>
      <Container className='mt-5 catsnsale'>
        <Container className='d-flex flex-wrap justify-content-between prod-cont'>
          <ProductDisplay></ProductDisplay>
        </Container>
        <Container className='d-flex flex-wrap align-content-between justify-content-center sales-prod p-3 w-auto'>

          {
            Items?.slice(0, 1).map((Items) => (
              <ItemOfDay addToCompare={addToCompare} removeFromCompare={removeFromCompare} selectedItems={selectedItems} Items={Items} key={Items.id} onAdd={() => onAdd(Items)} onRemoveFromPage={() => onRemoveFromPage(Items._id)} ></ItemOfDay>
            ))
          }
        </Container>
      </Container>
      <Container fluid className='d-flex flex-nowrap flex-column sales-prod-carousel'>
        <Container className='d-flex flex-wrap justify-content-start'>
          <b className='pt-4 pb-4'><h1>{t('car1')}</h1></b>
          <Container className='d-flex flex-row mt-2 justify-content-center items-list-handle'>
            <AliceCarousel  responsive={{
              0: {
                items: 1
              },
              1024: {
                items: 5
              }
            }} mouseTracking >{Items?.map((Items) => {
              if (Items.promo === "Скидка") {
                return <ItemModel role='banner' onDragStart={handleDragStart} addToCompare={addToCompare} removeFromCompare={removeFromCompare} selectedItems={selectedItems} Items={Items} key={Items.id} onAdd={() => onAdd(Items)} onRemoveFromPage={() => onRemoveFromPage(Items._id)} ></ItemModel>
              } else if (Items.promo !== "Скидка") {
                return ''
              }
            })}</AliceCarousel>
          </Container>
          {/* <Container className='d-flex justify-content-center'>
              <AppPagination Items={Items} setItems={(item) => setItems(item)} ></AppPagination>
            </Container> */}
        </Container>
        <Container className='d-flex flex-wrap justify-content-center mt-5 mb-3'>
          <Link type='button' to='/catalog' className='bttn-more'>{t('more1')}</Link>
        </Container>
      </Container>
      <Container>
        <h1 className='pt-4 pb-4'>{t('car2')}</h1>
        <Container>
          <PromosDisplay></PromosDisplay>
          <Container className='d-flex flex-wrap justify-content-center mt-5 mb-3'>
            <Button variant='outline-warning' className='bttn-low'>{t('more2')}</Button>
          </Container>
        </Container>
      </Container>
      <Container fluid className='d-flex flex-nowrap flex-column sales-prod-carousel'>
        <Container className='d-flex flex-wrap justify-content-start'>
          <b className='pt-4 pb-4'><h1>{t('car3')}</h1></b>
          <Container className='d-flex mt-2 justify-content-center items-list-handle'>
            <AliceCarousel responsive={{
              0: {
                items: 1
              },
              1024: {
                items: 5,
              }
            }} mouseTracking >
              {Items.map(Items => 
                 <ItemModel addToCompare={addToCompare} removeFromCompare={removeFromCompare} selectedItems={selectedItems} Items={Items} key={Items.id} onAdd={() => onAdd(Items)} onRemoveFromPage={() => onRemoveFromPage(Items._id)} ></ItemModel>
              )}
            </AliceCarousel>

          </Container>
          {/* <Container className='d-flex justify-content-center'>
              <AppPagination Items={Items} setItems={(item) => setItems(item)}  ></AppPagination>
            </Container> */}
        </Container>
        <Container className='d-flex flex-wrap justify-content-center mt-5 mb-3'>
          <Link type='button' to='/catalog' className='bttn-more'>{t('more1')}</Link>
        </Container>
      </Container>
      <CardsItem></CardsItem>
      <Container fluid className='d-flex flex-nowrap flex-column sales-prod-carousel' style={{ backgroundColor: '#FFF' }}>
        <Container className='d-flex flex-wrap justify-content-start'>
          <b className='pt-5 pb-2'><h1>{t('car4')}</h1></b>
          <Container className='d-flex mt-2 justify-content-center items-list-handle'>
          <AliceCarousel responsive={{
              0: {
                items: 1
              },
              1024: {
                items: 5,
              }
            }} mouseTracking >
              {Items?.map((Items) => {
                return <ItemModel addToCompare={addToCompare} removeFromCompare={removeFromCompare} selectedItems={selectedItems} Items={Items} key={Items.id} onAdd={() => onAdd(Items)} onRemoveFromPage={() => onRemoveFromPage(Items._id)} ></ItemModel>
              })}
            </AliceCarousel>


          </Container>
          {/* <Container className='d-flex justify-content-center'>
              <AppPagination Items={Items} setItems={(Items) => setItems(Items)} ></AppPagination>
            </Container> */}
        </Container>
        <Container className='d-flex flex-wrap justify-content-center mt-5 mb-3'>
          <Link type='button' to='/catalog' className='bttn-more'>{t('more1')}</Link>
        </Container>
      </Container>
      <Container fluid>
        <Marquee className='track mt-4 mb-5'>
          <Image width='80%' height='80%' src={tick1} ></Image>
          <Image width='80%' height='80%' src={tick2} ></Image>
          <Image width='80%' height='80%' src={tick3} ></Image>
          <Image width='80%' height='80%' src={tick4} ></Image>
          <Image width='80%' height='80%' src={tick1} ></Image>
          <Image width='80%' height='80%' src={tick2} ></Image>
          <Image width='80%' height='80%' src={tick3} ></Image>
          <Image width='80%' height='80%' src={tick4} ></Image>
          <Image width='80%' height='80%' src={tick1} ></Image>
          <Image width='80%' height='80%' src={tick2} ></Image>
          <Image width='80%' height='80%' src={tick3} ></Image>
          <Image width='80%' height='80%' src={tick4} ></Image>
          <Image width='80%' height='80%' src={tick1} ></Image>
          <Image width='80%' height='80%' src={tick2} ></Image>
          <Image width='80%' height='80%' src={tick3} ></Image>
          <Image width='80%' height='80%' src={tick4} ></Image>
        </Marquee>
      </Container>
    </>
  )
}

