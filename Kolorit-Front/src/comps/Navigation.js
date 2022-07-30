import React, { useState, useEffect } from 'react'
import { Container, Nav, Navbar, Form, NavDropdown } from 'react-bootstrap'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@mui/icons-material/Close";
import { Link } from 'react-router-dom'
import qIcon from '../assets/question.png'
import flagR from '../assets/flag.png'
import flagRo from '../assets/flagRo.png'
import flagEn from '../assets/flagEn.png'
import logo from '../assets/nav-logo.svg'
import phone from '../assets/phone.png'
import com from '../assets/com.png'
import prof from '../assets/prof.png'
import cart from '../assets/cart.png'
import Badge from '@mui/material/Badge'
import MenuItemsDisplay from './MenuItemsDisplay'
import { useSelector } from 'react-redux'
import i18n from '../i18';
import { publicRequest } from '../requests/request'
import { useTranslation } from 'react-i18next'
import SearchComp from './SearchComp'


export default function Navigation({ cartItems, selectedItems, onAdd, onRemoveFromPage, removeFromCompare, addToCompare }) {
  const [Items, setItems] = useState([])
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`/items/find`)
        setItems(res.data)
      } catch (e) {

      }
    }
    getItems()
  }, [])
  const [isVisible, setIsVisible] = useState(true);
  const [height, setHeight] = useState(0)
  const { t, i18n } = useTranslation()
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () =>
      window.removeEventListener("scroll", listenToScroll);
  }, [])
  const [query, setQuery] = useState('')


  const listenToScroll = () => {
    let heightToHideFrom = 650;
    const winScroll = document.body.scrollTop ||
      document.documentElement.scrollTop;
    setHeight(winScroll);

    if (winScroll < heightToHideFrom) {
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };
  const user = useSelector((state) => state.user.currentUser)
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = Items.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
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
      <Navbar expand='lg' collapseOnSelect className='d-flex flex-column align-items-stretch main-nav sticky-top'>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant='dark' className='nav-fix1 sticky-top'>
          <Container className='nav-fix' >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className='me-auto' >
                <Link className='nav-link white' to='/about'>{t('nav1')}</Link>
                <Link className='nav-link white' to='/contacts'>{t('nav2')}</Link>
                <Link className='nav-link gold' to='/sales'>{t('nav3')}</Link>
                <Link className='nav-link white' to='/partnership'>{t('nav4')}</Link>
                <Link className='nav-link white' to='/brands'>{t('nav5')}</Link>
                <Link className='nav-link gold' to='/promotions'>{t('nav6')}</Link>
              </Nav>

              <Nav className='me-2 d-flex align-items-center position relative'>
                <Link to='/' className='font-fix nav-link d-flex align-items-center justify-content-between'><img className='me-2' src={qIcon} /> {t('nav7')}</Link>
                <div className="dropdown1">
                  <button className="dropbtn1">{t('lang')}</button>
                  <div className="dropdown-content1">
                    <button onClick={() => changeLanguage('ru')} ><img width={12} height={12} src={flagR} />Ru</button>
                    <button onClick={() => changeLanguage('ro')} ><img width={12} height={12} src={flagRo} />Ro</button>
                    <button onClick={() => changeLanguage('en')} ><img width={12} height={12} src={flagEn} />En</button>
                  </div>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Navbar collapseOnSelect expand="lg" className='nav-fix sticky-top head position-relative' height={72}>
          <Container>
            <Navbar.Brand>
              <Link to='/'><img
                src={logo}
              /></Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              {isVisible &&
                <NavDropdown className='navdrop me-0' aria-expanded='true' title={`${t('head0')}`} id="basic-nav-dropdown">
                  <Container className='menu'>
                    <MenuItemsDisplay></MenuItemsDisplay>
                  </Container>
                </NavDropdown>
              }
              <Nav>
                <Nav.Item className='d-flex align-items-center m-2'><img src={phone} /><a className='black real-no-dec' href='tel:+37379559663'>+373&#x2212;79&#x2212;559&#x2212;663</a></Nav.Item>
              </Nav>
              <Container className='d-flex flex-wrap '>
                {/* <div class="dropdown1"> */}
                <Form.Control
                  placeholder="Поиск..."
                  id='search'
                  aria-label="Search"
                  className='dropdown-search'
                  value={wordEntered}
                  onChange={handleFilter}
                />
                {/* <div className="searchIcon">
                  {filteredData.length === 0 ? (
                    <SearchIcon />
                  ) : (
                    <CloseIcon id="clearBtn" onClick={clearInput} />
                  )}
                </div> */}

                {filteredData.length !== 0 && (
                  <div className="dropdown-search-content">
                    {filteredData.slice(0,5).map((Items) => (

                      <SearchComp
                        Items={Items} key={Items._id} addToCompare={addToCompare} removeFromCompare={removeFromCompare} selectedItems={selectedItems} onAdd={() => onAdd(Items)} onRemoveFromPage={() => onRemoveFromPage(Items._id)} ></SearchComp>

                    ))}
                  </div>
                )}




              </Container>
              <Nav>
                <Link to='/compare' className="d-flex justify-content-center flex-wrap nav-link text-center">{selectedItems.length !== 0 ? (<Badge badgeContent={selectedItems.length} color="warning"><img src={com} /></Badge>) : (<img src={com} />)}{t('head1')}</Link>
                <Link to='/cart' className="d-flex justify-content-center flex-wrap nav-link"> {cartItems.length !== 0 ? (<Badge badgeContent={cartItems.length} color="warning"><img src={cart} /></Badge>) : (<img src={cart} />)} {t('head2')}</Link>
                <Link to={user ? `/profile` : `/login`} className="d-flex justify-content-center flex-wrap nav-link"><img src={prof} />{user ? (<>{t('head3/1')}</>) : (<>{t('head3/2')}</>)}</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className='smth sticky-top' ></Container>
      </Navbar>

    </>
  )
}
