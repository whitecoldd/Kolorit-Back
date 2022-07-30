import React, { useState, useEffect } from 'react'
import { Container, Image, Button, Breadcrumb, Row, Col } from 'react-bootstrap'
import conts1 from '../assets/conts1.png'
import conts2 from '../assets/conts2.png'
import phone from '../assets/phone.png'
import address from '../assets/address.png'
import clock from '../assets/clock.png'
import MapContainer from '../comps/Map'
import {Link} from 'react-router-dom'
import {publicRequest} from '../requests/request'
import { useTranslation } from 'react-i18next'


export default function Contacts() {
  const [Items, setItems] = useState([])
useEffect(() => {
  const getItems = async ()=>{
    try {
      const res = await publicRequest.get(`/contact/find`)
      setItems(res.data)
    } catch (e) {
      console.log(e)
    }
  } 
  getItems()
}, [])
const {t} = useTranslation()

    return (
      <>
        <Container className='mt-3'>
          <Breadcrumb>
            <Breadcrumb.Item href="/">{t('main')}</Breadcrumb.Item>
            <Breadcrumb.Item active><mark>{t('nav2')}</mark></Breadcrumb.Item>
          </Breadcrumb>
        </Container>
        <Container fluid className='tabs-cont pt-3 pb-3 mt-2 mb-5'>
          <h1>{t('conts')}</h1>
        </Container>
        <Container>
          <Container>
          {Items?.map((item) => (
          <Container>
          <Container className='content-cont d-flex mt-5' style={{paddingRight: '0px'}}>
            <Image fluid src={item.img}></Image>
            <Container className='p-4'>
              <h1 className='p-3'>{item.name}</h1>
              <Container className='d-flex align-items-start'>
                <Image width='auto' height='auto' src={phone}></Image>
                <Container className='d-flex flex-column align-items-start'>
                  <h3>{t('phone')}</h3>
                  <p>{item.phone}</p>
                </Container>
              </Container>
              <Container className='d-flex align-items-start'>
                <Image width='auto' height='auto' src={address}></Image>
                <Container className='d-flex flex-column align-items-start mb-3'>
                  <h3>{t('address')}</h3>
                  <p>{item.address}</p>
                  <a href='#map' type='button' className='bttn-map'>{t('map-btn')}</a>
                </Container>
              </Container>
              <Container className='d-flex align-items-start'>
                <Image width='auto' height='auto' src={clock}></Image>
                <Container className='d-flex flex-column align-items-start'>
                  <h3>{t('nav7')}</h3>
                  <Container className='d-flex align-items-start'>
                    <Container className='text-center linevert'>
                      <p>{t('days')}</p>
                      <p>{item.workHours} </p>
                    </Container>
                    <Container className='text-center'>
                      <p>{t('day')}</p>
                      <p>  {item.workHoursH}  </p>
                    </Container>
                  </Container>
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      ))}
            {/* <Container>
              <Container className='content-cont d-flex mt-5'>
                <Image fluid src={conts2}></Image>
                <Container className='p-4'>
                  <h1 className='p-3'>Магазин “Kolorit”</h1>
                  <Container className='d-flex align-items-start'>
                    <Image width='auto' height='auto' src={phone}></Image>
                    <Container className='d-flex flex-column align-items-start'>
                      <h3>Телефон</h3>
                      <p>+373-79-559-338</p>
                    </Container>
                  </Container>
                  <Container className='d-flex align-items-start'>
                    <Image width='auto' height='auto' src={address}></Image>
                    <Container className='d-flex flex-column align-items-start mb-3'>
                      <h3>Адресс</h3>
                      <p>г.Комрат, ул.Ленина 12/А</p>
                      <a href='#map' type='button' className='bttn-map'>Как добраться?</a>
                    </Container>
                  </Container>
                  <Container className='d-flex align-items-start'>
                    <Image width='auto' height='auto' src={clock}></Image>
                    <Container className='d-flex flex-column align-items-start'>
                      <h3><span>Г</span>рафик работы</h3>
                      <Container className='d-flex align-items-start'>
                        <Container className='text-center linevert'>
                          <p>Пн. - Сб.</p>
                          <p>08:00 - 18:00 </p>
                        </Container>
                        <Container className='text-center'>
                          <p>Вс.</p>
                          <p>  08:00 - 16:00  </p>
                        </Container>
                      </Container>
                    </Container>
                  </Container>
                </Container>
              </Container>
            </Container> */}
            {/* <Container>
              <Container className='content-cont d-flex mt-5'>
                <Image fluid src={conts1}></Image>
                <Container className='p-4'>
                  <h1 className='p-3'>Магазин “Kolorit”</h1>
                  <Container className='d-flex align-items-start'>
                    <Image width='auto' height='auto' src={phone}></Image>
                    <Container className='d-flex flex-column align-items-start'>
                      <h3>Телефон</h3>
                      <p>+373-79-559-338</p>
                    </Container>
                  </Container>
                  <Container className='d-flex align-items-start'>
                    <Image width='auto' height='auto' src={address}></Image>
                    <Container className='d-flex flex-column align-items-start mb-3'>
                      <h3>Адресс</h3>
                      <p>г.Комрат, ул.Котовского 12/А</p>
                      <a href='#map' type='button' className='bttn-map'>Как добраться?</a>
                    </Container>
                  </Container>
                  <Container className='d-flex align-items-start'>
                    <Image width='auto' height='auto' src={clock}></Image>
                    <Container className='d-flex flex-column align-items-start'>
                      <h3><span>Г</span>рафик работы</h3>
                      <Container className='d-flex align-items-start'>
                        <Container className='text-center linevert'>
                          <p>Пн. - Сб.</p>
                          <p>08:00 - 18:00 </p>
                        </Container>
                        <Container className='text-center'>
                          <p>Вс.</p>
                          <p>  08:00 - 16:00  </p>
                        </Container>
                      </Container>
                    </Container>
                  </Container>
                </Container>
              </Container>
            </Container> */}
          </Container>
        </Container>
        <Container id="map" fluid className='map-cont mt-3 d-flex justify-content-center'>
          <MapContainer  />
        </Container>

      </>
    )
  }

