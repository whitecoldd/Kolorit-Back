import React, { useState, useEffect } from 'react'
import { Container, Form, ButtonGroup, ToggleButton, Button, Image, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import phone from '../assets/phone.png'
import address from '../assets/address.png'
import clock from '../assets/clock.png'
import { useSelector } from 'react-redux'
import { userRequest, publicRequest } from '../requests/request'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTranslation } from 'react-i18next'

const ProcessOrder = ({ cartItems }) => {
    const [inputs, setInputs] = useState({})
    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };


    const admin = useSelector((state) => state.user?.currentUser);
    const userName = useSelector((state) => state.user?.currentUser?.username)
    const phone = useSelector((state) => state.user?.currentUser?.phone)
    const email = useSelector((state) => state.user?.currentUser?.email)
    const productId = cartItems
    const quantity = cartItems.length
    const order = { ...inputs, userName: userName || inputs.userFName, phone: phone || inputs.phone, email: email || inputs.email,  productId: productId, quantity: quantity }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await userRequest.post(`/order/`, order)
            console.log(res.data)
        } catch (e) {
            console.log(e)
        }
    }
    const [select, setSelect] = useState('---')
    const [text, setText] = useState()
    const [Items, setItems] = useState([])
    const { t } = useTranslation()
    useEffect(() => {
        const getItems = async () => {
            try {
                const res = await publicRequest.get(`/contact/find`)
                setItems(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        getItems()
    }, [])

    const handleSelect = (event) => {
        setSelect(event.target.value)
        console.log(select)
        if (select === 'delivery') {

            setText(<>
                {Items?.slice(0, 1).map((item) => (
                    <Container>
                        <Container className='content-cont d-flex mt-5'>
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
                                    <Container name='address' className='d-flex flex-column align-items-start mb-3'>
                                        <h3>{t('address')}</h3>
                                        <p name='address'>{item.address}</p>
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
            </>)
            return text
        } else if (select === 'pick-up') {

            setText(<>

                <Form.Group className="mb-3 pe-3 " id="formprocess" controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" name='address' placeholder="Адрес" onChange={handleChange} />
                </Form.Group>
            </>)
            return text
        } else if (select === '---') {
            setText('')
            return text
        }
    }
    return (
        <>
            <Container>
                <Form >

                    <Container className='d-flex align-items-baseline p-0'>

                        <h1>{t('procorder')}</h1>    {cartItems.length} {t('prod')}
                    </Container>

                    <Container className='d-flex align-items-center'>

                        <Button variant='warning' className="br-50 position-absolute">1</Button>
                        <h2 className='position-relative ms-3'>{t('userdet')}</h2>
                    </Container>
                    <Container className='b-left'>


                        <Container className='d-flex justify-content-start forming w-30 m-0'>
                            <label className='me-2'>{t('law')}</label>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label={t('phys')}
                            />
                        </Container>

                        <Form.Control type='hidden' name='userId' value={admin?._id} />
                        <Form.Control type='hidden' name='productId' value={[cartItems?.id]} />
                        <Form.Control type='hidden' name='quantity' value={cartItems?.length} />
                        {admin ? ''
                            : <>
                                <h4 className='forming1 mt-3 mb-4 black bold d-flex flex-nowrap'> {t('isthere')} <Link to='/login' className='orange bold' >{t('enter')}</Link> <ArrowForwardIosIcon /> </h4>
                                <Container className='d-flex '>
                                    <Form.Group className="mb-3 pe-3 " id="formprocess" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="text" name='userFName' placeholder="Имя пользователя" onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 pe-3 " id="formprocess" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control type="text" name='phone' placeholder='Телефон' onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 pe-3 " id="formprocess" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control type="email" name='email' placeholder='E-mail (необязательно)' onChange={handleChange} />
                                    </Form.Group>
                                </Container>
                            </>
                        }
                    </Container>
                    <Button variant='warning' className="br-50 position-absolute mt-1">2</Button>
                    <h2 className='position-relative ms-4'>{t('deltype')}</h2>
                    <Container className='b-left'>

                        <Form.Select name='delType' value={select} aria-label="Default select example" onChange={(e) => { handleSelect(e); handleChange(e) }}>
                            <option>---</option>
                            <option value="pick-up">{t('pickup')}</option>
                            <option value="delivery">{t('del')}</option>
                        </Form.Select>
                        <Container className='mt-4'>{text}</Container>
                    </Container>

                    <Button variant='warning' className="br-50 position-absolute mt-2">3</Button>
                    <h2 className=' position-relative ms-4 mt-2'>{t('paytype')}</h2>
                    <Container className='b-left'>

                        <Form.Select name='payment' className='mb-3' aria-label="Default select example" onChange={handleChange}>
                            <option value="transaction">{t('trans')}</option>
                            <option value="online-payment">{t('online')}</option>
                            <option value="credit">{t('cred')}</option>
                            <option value="cash">{t('cash')}</option>
                        </Form.Select>


                    </Container>
                    <button onClick={handleSubmit} className='bttn-cart mb-3'>{t('sendit')}</button>
                </Form>
                <p className='black'>{t('conf')}</p>
            </Container>
        </>
    )
}

export default ProcessOrder