import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { register } from '../redux/apiCalls'
import { useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {publicRequest} from '../requests/request'
import { useTranslation } from 'react-i18next'

const Register = () => {
    const [username, setUsername] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({})
    const dispatch = useDispatch();
    const history = useNavigate()
    const [inputs, setInputs] = useState({})
    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const admin = useSelector((state) => state.user.currentUser);
    const user = { ...inputs }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await publicRequest.post(`/auth/register`, user)
            console.log(res.data)
            history('/login')
        } catch (e) {
            console.log(e)
        }
    }
    const {t} = useTranslation()

    return (
        <>
            <Container>
                <h1>{t('reg')}</h1>
                <Form className="d-flex flex-column align-items-center">
                    <Form.Group className="mb-3 d-flex flex-wrap  w-50" controlId="exampleForm.ControlInput1">
                        <Form.Label>E-mail {t('address')}</Form.Label>
                        <Form.Control type="email" name='email' placeholder="name@example.com" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex flex-wrap  w-50" controlId="exampleForm.ControlInput1">
                        <Form.Label>{t('phone')}</Form.Label>
                        <Form.Control type="phone" name='phone' placeholder="+373xxxxxxxx" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex flex-wrap  w-50" controlId="exampleForm.ControlInput2">
                        <Form.Label>{t('uname')}</Form.Label>
                        <Form.Control type="text" name='username' placeholder="имяФамилия" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex flex-wrap  w-50" controlId="exampleForm.ControlInput3">
                        <Form.Label>{t('uname')}</Form.Label>
                        <Form.Control type="text" name='fname' placeholder="Имя" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex flex-wrap  w-50" controlId="exampleForm.ControlInput4">
                        <Form.Label>{t('sname')}</Form.Label>
                        <Form.Control type="text" name='lname' placeholder="Фамилия" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex flex-wrap  w-50" controlId="exampleForm.ControlInput5">
                        <Form.Label>{t('pw')}</Form.Label>
                        <Form.Control type="password" name='password' placeholder="********" onChange={handleChange}/>
                    </Form.Group>
                    {/* <Form.Group className="mb-3 d-flex flex-wrap  w-50" controlId="exampleForm.ControlInput6">
                        <Form.Label>Подтвердите пароль</Form.Label>
                        <Form.Control type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group> */}
                    <Button type='submit' onClick={handleSubmit} className='bttn-cart mb-3'>{t('create')}</Button>
                </Form>
            </Container>
        </>
    )
}

export default Register