import React, { useState } from 'react'
import { Container, Form, Breadcrumb } from 'react-bootstrap'
import BrandsItemDisplay from '../comps/BrandsItemDisplay';
import { BrandsItem } from '../comps/BrandsItem';
import {useTranslation} from 'react-i18next'
function Brands({ placeholder, data }) {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  const {t} = useTranslation()
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };


  return (
    <>
      <Container className='mt-3'>
        <Breadcrumb>
          <Breadcrumb.Item href="/">{t('main')}</Breadcrumb.Item>
          <Breadcrumb.Item active><mark>{t('nav5')}</mark></Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container className='mt-5 mb-5'>
        <center>{t('nav5')} A-Z</center>
      </Container>
      <Container fluid className='bgalpha d-flex justify-content-center mt-3 pt-4 pb-2'> {alphabet.map((alpha, i) => (<a type='button' className='text-uppercase alpha nodec' href={`#${alphabet[i]}`} >  {alpha}</a>))}</Container>
      <Container className='mt-5 mb-5'>
        <Form.Control
          type='text'
          placeholder={placeholder}
          id='searchbrand'
          aria-label="Search"
          value={wordEntered}
          onChange={handleFilter}
          data={alphabet} />
      </Container>
      <Container>
        {alphabet.map((alpha, i) => (
          <Container className='d-flex align-items-center mb-5'>
            <h1 id={alphabet[i]}>{alpha}</h1>
            <Container className='d-flex flex-column align-items-center'>
              {BrandsItem.filter(item => item.name.toLowerCase().includes(wordEntered)).map((item) => (
                <BrandsItemDisplay item={item} key={item.id} ></BrandsItemDisplay>
              ))}
            </Container>
            <Container className='d-flex flex-column align-items-center'>
              {BrandsItem.filter(item => item.name.toLowerCase().includes(wordEntered)).map((item) => (
                <BrandsItemDisplay item={item} key={item.id} ></BrandsItemDisplay>
              ))}
            </Container>
            <Container className='d-flex flex-column align-items-center'>
              {BrandsItem.filter(item => item.name.toLowerCase().includes(wordEntered)).map((item) => (
                <BrandsItemDisplay item={item} key={item.id} ></BrandsItemDisplay>
              ))}
            </Container>
          </Container>
        )
        )}
      </Container>
    </>
  )
}

export default Brands
