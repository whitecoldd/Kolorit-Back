import React, { Component } from 'react'
import logo from '../assets/nav-logo.svg'
import fb from '../assets/fb.png'
import inst from '../assets/inst.png'
import tg from '../assets/tg.png'
import wa from '../assets/wa.png'
import { Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Home from '../pages/Home'
import { useTranslation } from 'react-i18next'
export function Footer (props) {
  const {t} = useTranslation()
    return (
      <>
        <Container fluid className='footer mt-2'>
          <Container className='d-flex footer-no' sticky='bottom'>
            <Container className='d-flex flex-column align-items-start pad-handle'>
              <a href='/'><Image src={logo} ></Image></a>
              <h4 className='mt-4 '>{t('foot1')}</h4>
              <h5 className='mt-3 pt-3 lineup'><a href="tel: +37379559663" className='real-no-dec white'>+373&#x2212;79&#x2212;559&#x2212;663 </a>, <a className='real-no-dec white' href="tel: +37368112889">+373&#x2212;68&#x2212;112&#x2212;889</a></h5>
              <p>{t('foot2')}</p>
              <input placeholder={`${t('foot26')}`} className='mt-3 mb-4 pb-1 input-fix' id='e-mail'></input>
              <Container className='d-flex'>
                <Image className='icons-fix' src={fb}></Image>
                <Image className='icons-fix' src={inst}></Image>
                <Image className='icons-fix' src={tg}></Image>
                <Image className='icons-fix' src={wa}></Image>
              </Container>
            </Container>
            <Container className='footer-nav me-5'>
              <h4 className='linedown pb-4'>{t('foot3')}</h4>
              <Container className='d-flex p-0 m-0'>
                <Container className=' p-0 m-0 d-flex flex-column'>
                  <Link to="/">{t('foot4')}</Link>
                  <Link to="/">{t('foot5')}</Link>
                  <Link to="/">{t('foot6')}</Link>
                  <Link to="/">{t('foot7')}</Link>
                  <Link to="/">{t('foot8')}</Link>
                  <Link to="/">{t('foot9')}</Link>
                  <Link to="/">{t('foot10')}</Link>
                </Container>
                <Container className='d-flex flex-column'>
                  <Link to="/">{t('foot11')}</Link>
                  <Link to="/">{t('foot12')}</Link>
                  <Link to="/">{t('foot13')}</Link>
                  <Link to="/">{t('foot14')}</Link>
                  <Link to="/">{t('foot15')}</Link>
                  <Link to="/">{t('foot16')} </Link>
                  <Link to="/">{t('foot17')}</Link>
                </Container>
              </Container>
            </Container>
            <Container className='footer-nav'>
              <h4 className='linedown pb-4'>{t('foot18')}</h4>
              <Container className='fix-right d-flex flex-column' >
                <Link to="/">{t('foot19')}</Link>
                <Link to="/">{t('foot20')}</Link>
                <Link to="/">{t('foot21')}</Link>
                <Link to="/">{t('foot22')}</Link>
                <Link to="/">{t('foot23')}</Link>
                <Link to="/">{t('foot24')}</Link>
                <Link to="/" className='heh'>{t('foot25')}</Link>
              </Container>
            </Container>
          </Container>
        </Container>




      </>
    )
}
export default Footer