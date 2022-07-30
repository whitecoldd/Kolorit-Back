import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, Button } from 'react-bootstrap'
import { login } from '../redux/apiCalls'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const history=useNavigate()
    const { isFetching, error } = useSelector((state) => state.user);
    const {t} = useTranslation()
    const handleClick = (e) => {
        e.preventDefault();
        try {
            login(dispatch, { username, password });
            history('/profile')
        }
        catch (e) {
            console.log(e)
            history('/login')
        }
    };
    return (
        <>
            <Container>
                <h1>{t('enter')}</h1>
                <Form className="d-flex flex-column align-items-center">
                    <Form.Group className="mb-3 d-flex flex-wrap  w-50" controlId="exampleForm.ControlInput1">
                        <Form.Label>{t('name')}</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex flex-wrap  w-50" controlId="exampleForm.ControlInput1">
                        <Form.Label>{t('pw')}</Form.Label>
                        <Form.Control type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button onClick={handleClick} disabled={isFetching} className='bttn-cart mb-3'>{t('auth')}</Button>
                    <Link to='/register'><h2 className='black real-no-dec'>{t('reg')}</h2></Link>
                </Form>
                {error && <h2>{t('err')}</h2>}
                
            </Container>
        </>
    )
}

export default Login