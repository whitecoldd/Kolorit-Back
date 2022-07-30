import React, { Component } from 'react'
import logo from '../assets/nav-logo.svg'
import fb from '../assets/fb.png'
import inst from '../assets/inst.png'
import tg from '../assets/tg.png'
import wa from '../assets/wa.png'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container, Image } from 'react-bootstrap'
import Home from '../pages/Home'
import { useTranslation } from 'react-i18next'
export function Footer (props) {
  const {t} = useTranslation()
    return (
      <>
        <Container fluid className='footer mt-2'>
          <Container className='d-flex footer-no' sticky='bottom'>
            <Container className='d-flex flex-column align-items-start pt-3 pb-5 me-5'>
              <a href='/'><Image src={logo} ></Image></a>
              <h4 className='mt-4 '>{t('foot1')}</h4>
              <h5 className='mt-3 lineup pt-3'>+373-79-559-663 , +373-68-112-889</h5>
              <p>{t('foot2')}</p>
              <input placeholder={`${t('foot26')}`} className='mt-3 mb-4 input-fix' id='e-mail'></input>
              <Container className='d-flex'>
                <Image className='icons-fix' src={fb}></Image>
                <Image className='icons-fix' src={inst}></Image>
                <Image className='icons-fix' src={tg}></Image>
                <Image className='icons-fix' src={wa}></Image>
              </Container>
            </Container>
            <Container className='footer-nav me-5'>
              <h4 className='linedown pb-4'>{t('foot3')}</h4>
              <Container className='d-flex'>
                <Container>
                  <p>{t('foot4')}</p>
                  <p>{t('foot5')}</p>
                  <p>{t('foot6')}</p>
                  <p>{t('foot7')}</p>
                  <p>{t('foot8')}</p>
                  <p>{t('foot9')}</p>
                  <p>{t('foot10')}</p>
                </Container>
                <Container>
                  <p>{t('foot11')}</p>
                  <p>{t('foot12')}</p>
                  <p>{t('foot13')}</p>
                  <p>{t('foot14')}</p>
                  <p>{t('foot15')}</p>
                  <p>{t('foot16')} </p>
                  <p>{t('foot17')}</p>
                </Container>
              </Container>
            </Container>
            <Container className='footer-nav'>
              <h4 className='linedown pb-4'>{t('foot18')}</h4>
              <Container className='fix-right' >
                <p>{t('foot19')}</p>
                <p>{t('foot20')}</p>
                <p>{t('foot21')}</p>
                <p>{t('foot22')}</p>
                <p>{t('foot23')}</p>
                <p>{t('foot24')}</p>
                <p className='heh'>{t('foot25')}</p>
              </Container>
            </Container>
          </Container>
        </Container>




      </>
    )
}
export default Footer