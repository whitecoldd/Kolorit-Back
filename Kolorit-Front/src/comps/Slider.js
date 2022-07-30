import React, { useState, useEffect } from 'react'
import { Carousel, Button } from 'react-bootstrap'
import { publicRequest } from '../requests/request';
import { useTranslation } from 'react-i18next'

const Slider = () => {
    const [index, setIndex] = useState(0);
    const {t} = useTranslation()

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const [items, setItems] = useState([]);
    useEffect(() => {
        const getItems = async ()=>{
          try {
            const res = await publicRequest.get(`/slider/find`)
            setItems(res.data)
          } catch (e) {
            console.log(e)
          }
        } 
        getItems()
      }, [])
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {items?.map(items=>
                <Carousel.Item key={items._id}>
                <img
                
                    className="w-100 h-99 main-img position-relative"
                    src={items.img}
                    alt="First slide"
                />
                <Button type='submit' href='/catalog' className="bttn position-absolute btn-warning" aria-pressed="false">{t('gotocat')}</Button>
                <Carousel.Caption>
                    <h2 className='pic-text position-absolute white'>{items.header}</h2>
                    <p className='pic-text-lower position-absolute'>{items.text}</p>    
                </Carousel.Caption>
            </Carousel.Item>
            )}
            
            {/* <Carousel.Item>
                {/* <Image width='100%' height='95%' src={slider}></Image>
          <h2 className='pic-text position-absolute'>Строй Материалы</h2>
          <p className='pic-text-lower position-absolute'>Наш магазин предлагает строительный материал, который Вы собираетесь покупать, не только предложит своему потенциальному покупателю большой выбор всевозможных стройматерилов, но и предоставит бесплатную консультацию по каждому из них.</p>
          <Button type='submit' href='/catalog' className="bttn position-absolute btn-warning" aria-pressed="false">Перейти к каталогу</Button>
                <img
                    className="d-block w-100"
                    src={slider}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item> */}
            {/* <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slider}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item> */}
        </Carousel>
    )
}

export default Slider