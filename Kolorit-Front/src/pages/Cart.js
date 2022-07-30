import React, { useState, useEffect } from 'react'
import { Container, Breadcrumb, Image, Button, Row, Col } from 'react-bootstrap'
import minus from '../assets/minus.png'
import plus from '../assets/plus.png'
import trash from '../assets/trash.png'
import { Link } from 'react-router-dom'
import ProcessOrder from './ProcessOrder'
import { useTranslation } from 'react-i18next'
import ItemModel from '../comps/ItemModel'
import { publicRequest } from '../requests/request'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import "react-alice-carousel/lib/scss/alice-carousel.scss";
export default function Cart(props) {
  const [Items, setItems] = useState([])
  const { cartItems, onAdd, onRemove, decreaseQty, addToCompare, removeFromCompare, selectedItems, onRemoveFromPage } = props;
  const totalPrice = cartItems.reduce((salePrice, item) => salePrice + item.qty * item.salePrice, 0)
  const { t } = useTranslation()
  const handleDragStart = (e) => e.preventDefault();
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
  return (
    <>
      <Container >
        <Row className='d-flex carthandle'>
          <Col sm={8}>
            <Container>
              <Breadcrumb>
                <Breadcrumb.Item href="/">{t('main')}</Breadcrumb.Item>
                <Breadcrumb.Item active><mark>{t('head2')}</mark></Breadcrumb.Item>
              </Breadcrumb>
              <h1>{t('head2')}</h1>
              <Container className='mt-4 cart-cont'>
                {cartItems.length === 0 && <h1 className=' product p-3'>{t('empty')}</h1>}
                {cartItems.map((item) => {
                  const productQty = item.salePrice * item.qty

                  return (
                    <>
                      <Container className='d-flex '>
                        <Container className='p-0'>
                          <Container className='d-flex ps-0 cart-card pt-3' key={item.id}>
                            <Container className='cartimgntext'>
                              <div className='img'>
                                <img width={100} height={100} src={item.img} alt='' />
                              </div>
                              <Container className='d-flex p-0 flex-column justify-content-between'>
                                <div className='cart-details'>
                                  <h3>{item.name}</h3>
                                </div>
                                <div className='cart-details'>
                                  <h5 className='black'>{t('code')} {item.code}</h5>
                                </div>
                              </Container>
                            </Container>
                            <Container className='d-flex check align-items-baseline'>
                              <Container className='d-flex flex-wrap align-items-center'>
                                <Container className='d-flex scale'>
                                  <button className='desCart me-2' onClick={() => decreaseQty(item)}>
                                    <Image src={minus} ></Image>
                                  </button>
                                  <Container className='qtyCart d-flex me-2'>
                                    <h1 className='qtyCartText' >{item.qty}</h1>
                                  </Container>
                                  <button className='incCart' onClick={() => onAdd(item)}>
                                    <Image src={plus} ></Image>
                                  </button>
                                </Container>
                                <Container className='d-flex justify-content-center'>
                                  <h5 className='black'>{item.salePrice} mdl/шт.</h5>
                                </Container>
                              </Container>
                              <Container className='d-flex flex-wrap'>
                                <Container>
                                  <h2 className='total-price'>{productQty} <span className='orange'>MDL</span></h2>
                                </Container>
                                <Container className='removeCart p-3'>
                                  <button className='removeCart'>
                                    <Image src={trash} onClick={() => onRemove(item)}></Image>
                                  </button>
                                </Container>
                              </Container>
                            </Container>
                          </Container>
                          <Container className='smth'></Container>
                        </Container>
                      </Container>
                    </>
                  )
                })}

              </Container>
            </Container>
          </Col>
          <Col sm={4}>
            <Container className='cart-total p-4'>
              <h2 className='total-price'>{t('chose')} {totalPrice}</h2>
              <h2 className='total-price'>{t('del')}</h2>
              <h2 className='total-price'>{t('all')} {totalPrice}</h2>
              <Container className='smth'></Container>
              <Container className='d-flex flex-column p-3'>
                <Link to='/process' > <Button variant='warning' className='bttn-cart'>{t('order')}</Button></Link>
                <input className='mt-4' id='cartsearch' placeholder='Введите промокод'></input>
              </Container>
            </Container>
          </Col>
        </Row>
      </Container>
      <Container className='d-flex mt-5 mb-3 justify-content-center items-list-handle'>
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
    </>
  )
}
