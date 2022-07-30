import React, { useState, useEffect } from 'react'
import { Nav, Container, Image, Tab, Breadcrumb } from 'react-bootstrap'
import about from '../assets/about.png'
import playb from '../assets/playb.png'
import tab1 from '../assets/tab1.png'
import CardsItem from '../comps/CardsItem'
import { publicRequest } from '../requests/request'
import {useTranslation} from 'react-i18next'
export default function About() {
  const [Items, setItems] = useState([])
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`/about/find`)
        setItems(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getItems()
  }, [])
  const {t} = useTranslation()
  const [items, setitems] = useState([])
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`/about/find?new=new`)
        setitems(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getItems()
  }, [])

  return (
    <>
      <Container className='mt-3'>
        <Breadcrumb>
          <Breadcrumb.Item href="/">{t('main')}</Breadcrumb.Item>
          <Breadcrumb.Item active><mark>{t('nav1')}</mark></Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container className='d-flex flex-column'>
        <Container className='d-flex'>
          {Items?.slice(0,1).map((Items => (
            <>
              <Container className='d-flex flex-column about-text'>
                <h1>{t('nav1')}</h1>
                <h3>{Items.header}</h3>
                <p>{Items.text}</p>
              </Container>
              <Container>
                <Image className='about-img' src={Items.img} ></Image>
              </Container>
            </>
          )))}
        </Container>
        <CardsItem></CardsItem>
        <Container className='video-el'>
          <button className='play-upper'>{t('watch')}</button>
          <Image className='play-button' src={playb} type='button'></Image>
        </Container>
      </Container>
      <Container fluid className='tabs-cont mt-3 pt-3 pb-5'>
        <Container>
          <h1 className='story-text'>{t('story')}</h1>
          <Tab.Container className='tabs' defaultActiveKey='first'>
            <Nav variant="tabs" className="mt-2">
              {items.slice(0,5).map(item=>(
                 <Nav.Item>
                 <Nav.Link type="button" eventKey={item._id} >{item.year}</Nav.Link>
               </Nav.Item>
              ))}
              {/* <Nav.Item>
                <Nav.Link type="button" eventKey="first" >2008</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link type="button" eventKey="second" >2012</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link type="button" eventKey="third" >2016</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link type="button" eventKey="fourth" >2019</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link type="button" eventKey="fifth" >2022</Nav.Link>
              </Nav.Item> */}
            </Nav>
            <Tab.Content className="mt-3">
            {items?.slice(0,5).map(item=>(
              <Tab.Pane eventKey={item._id} >
              <Container className='d-flex tabs-about'>
                <img height='90%' width='80%' src={item.img} />
                <Container>
                  <h1>{item.header}</h1>
                  <p>{item.text}</p>
                </Container>
              </Container>
            </Tab.Pane>
            ))}
             
            {/*  <Tab.Pane eventKey="first" >
                <Container className='d-flex'>
                  <img height='90%' width='80%' src={tab1} />
                  <Container>
                    <h1>Открытие первого магазина</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat feugiat dapibus. Nunc velit orci, rhoncus eu tristique eget, efficitur sed diam. Suspendisse rhoncus finibus lacus, at porta felis venenatis sed. Nulla eget aliquam lacus, et pretium nunc. Morbi hendrerit, nisi mollis lacinia pulvinar, nisi mauris rhoncus risus, eget iaculis orci purus eget diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat feugiat dapibus. Morbi hendrerit, nisi mollis lacinia pulvinar, nisi mauris rhoncus risus, eget iaculis orci purus eget diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat feugiat dapibus. </p>
                  </Container>
                </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="second" >
                <Container className='d-flex'>
                  <img height='90%' width='80%' src={tab1} />
                  <Container>
                    <h1>Открытие первого магазина</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat feugiat dapibus. Nunc velit orci, rhoncus eu tristique eget, efficitur sed diam. Suspendisse rhoncus finibus lacus, at porta felis venenatis sed. Nulla eget aliquam lacus, et pretium nunc. Morbi hendrerit, nisi mollis lacinia pulvinar, nisi mauris rhoncus risus, eget iaculis orci purus eget diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat feugiat dapibus. Morbi hendrerit, nisi mollis lacinia pulvinar, nisi mauris rhoncus risus, eget iaculis orci purus eget diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat feugiat dapibus. </p>
                  </Container>
                </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="third" >
                <Container className='d-flex'>
                  <img height='90%' width='80%' src={tab1} />
                  <Container>
                    <h1>Открытие первого магазина</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat feugiat dapibus. Nunc velit orci, rhoncus eu tristique eget, efficitur sed diam. Suspendisse rhoncus finibus lacus, at porta felis venenatis sed. Nulla eget aliquam lacus, et pretium nunc. Morbi hendrerit, nisi mollis lacinia pulvinar, nisi mauris rhoncus risus, eget iaculis orci purus eget diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat feugiat dapibus. Morbi hendrerit, nisi mollis lacinia pulvinar, nisi mauris rhoncus risus, eget iaculis orci purus eget diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat feugiat dapibus. </p>
                  </Container>
                </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="fourth" >
                <Container className='d-flex'>
                  <img height='90%' width='80%' src={tab1} />
                  <Container>
                    <h1>Открытие первого магазина</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat feugiat dapibus. Nunc velit orci, rhoncus eu tristique eget, efficitur sed diam. Suspendisse rhoncus finibus lacus, at porta felis venenatis sed. Nulla eget aliquam lacus, et pretium nunc. Morbi hendrerit, nisi mollis lacinia pulvinar, nisi mauris rhoncus risus, eget iaculis orci purus eget diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat feugiat dapibus. Morbi hendrerit, nisi mollis lacinia pulvinar, nisi mauris rhoncus risus, eget iaculis orci purus eget diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat feugiat dapibus. </p>
                  </Container>
                </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="fifth" >
                <Container className='d-flex'>
                  <img height='90%' width='80%' src={tab1} />
                  <Container>
                    <h1>Открытие первого магазина</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat feugiat dapibus. Nunc velit orci, rhoncus eu tristique eget, efficitur sed diam. Suspendisse rhoncus finibus lacus, at porta felis venenatis sed. Nulla eget aliquam lacus, et pretium nunc. Morbi hendrerit, nisi mollis lacinia pulvinar, nisi mauris rhoncus risus, eget iaculis orci purus eget diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat feugiat dapibus. Morbi hendrerit, nisi mollis lacinia pulvinar, nisi mauris rhoncus risus, eget iaculis orci purus eget diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat feugiat dapibus. </p>
                  </Container>
                </Container>
              </Tab.Pane> */}

            </Tab.Content>
          </Tab.Container>
        </Container>
      </Container>
    </>
  )
}
