import React, { useState, useEffect } from "react";
import {
  Container,
  Nav,
  Navbar,
  Form,
  NavDropdown,
  Button,
} from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import qIcon from "../assets/question.png";
import flagR from "../assets/flag.png";
import flagRo from "../assets/flagRo.png";
import flagEn from "../assets/flagEn.png";
import logo from "../assets/nav-logo.svg";
import phone from "../assets/phone.png";
import com from "../assets/com.png";
import logo1 from "../assets/logo1.svg";
import prof from "../assets/prof.png";
import cart from "../assets/cart.png";
import catnav from "../assets/catnav.svg";
import Badge from "@mui/material/Badge";
import MenuItemsDisplay from "./MenuItemsDisplay";
import { useSelector } from "react-redux";
import i18n from "../i18";
import { publicRequest } from "../requests/request";
import { useTranslation } from "react-i18next";
import SearchComp from "./SearchComp";
import MobileMenu from "./MobileMenu";

export default function Navigation({
  cartItems,
  selectedItems,
  onAdd,
  onRemoveFromPage,
  removeFromCompare,
  addToCompare,
  Open,
  setOpen,
}) {
  const [Items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`api/items/find`);
        setItems(res.data);
      } catch (e) {}
    };
    getItems();
  }, []);
  const [isVisible, setIsVisible] = useState(true);
  const [height, setHeight] = useState(0);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);
  const [query, setQuery] = useState("");

  const listenToScroll = () => {
    let heightToHideFrom = 650;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    setHeight(winScroll);

    if (winScroll < heightToHideFrom) {
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };
  const user = useSelector((state) => state.user.currentUser);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    window.location.reload();
  };

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

  const nonRef = (e) => {
    e.preventDefault();
  };

  const [myLocalStorageData, setMyLocalStorageData] = useState({});
  useEffect(() => {
    const lng = localStorage.getItem("i18nextLng");
    setMyLocalStorageData(lng);
  }, []);

  const [Width, setWidth] = useState(true);

  useEffect(() => {
    const handleWidth = () => {
      let widthToHideFrom = 650;
      if (window.innerWidth < widthToHideFrom) {
        setWidth(false);
      } else {
        setWidth(true);
      }
    };

    handleWidth();
  }, [window.innerWidth]);
  const [Vision, setVision] = useState(true);
  const Close = (e) => {
    e.preventDefault();
    setVision(false);
  };
  const OpenIt = (e) => {
    e.preventDefault();
    setVision(true);
  };
  const total = cartItems.reduce((accum, item) => accum + item.qty, 0);

  const [hide, setHide] = useState(true);
  const [hideall, setHideall] = useState(true);
  return (
    <>
      <Navbar
        expand="lg"
        collapseOnSelect
        className="d-flex flex-column align-items-stretch main-nav sticky-top"
      >
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          className="nav-fix1 sticky-top inv-nav"
        >
          <Container className="nav-fix">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Link className="nav-link white" to="/about">
                  {t("nav1")}
                </Link>
                <Link className="nav-link white" to="/contacts">
                  {t("nav2")}
                </Link>
                <Link className="nav-link gold" to="/sales">
                  {t("nav3")}
                </Link>
                <Link className="nav-link white" to="/partnership">
                  {t("nav4")}
                </Link>
                <Link className="nav-link white" to="/brands">
                  {t("nav5")}
                </Link>
                <Link className="nav-link gold" to="/promotions">
                  {t("nav6")}
                </Link>
              </Nav>

              <Nav className="me-2 d-flex align-items-center position-relative">
                <Link
                  to="/contacts"
                  className="font-fix nav-link d-flex align-items-center justify-content-between"
                >
                  <img className="me-2" src={qIcon} /> {t("nav7")}
                </Link>
                <div className="dropdown1">
                  <button className="dropbtn1">{t("lang")}</button>
                  <div className="dropdown-content1">
                    <button
                      className="d-flex align-items-center"
                      onClick={() => changeLanguage("ru")}
                    >
                      <img width={12} height={12} src={flagR} />
                      Ru
                    </button>
                    <button
                      className="d-flex align-items-center"
                      onClick={() => changeLanguage("ro")}
                    >
                      <img width={12} height={12} src={flagRo} />
                      Ro
                    </button>
                    <button
                      className="d-flex align-items-center"
                      onClick={() => changeLanguage("en")}
                    >
                      <img width={12} height={12} src={flagEn} />
                      En
                    </button>
                  </div>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Navbar
          collapseOnSelect
          expand="lg"
          className="nav-fix sticky-top head position-relative"
          height={72}
        >
          <Container className="d-flex p-0 new-wid">
            <Navbar.Brand>
              <Link to="/">
                <img src={hide ? logo : logo1} width={!Width&&hide ? 160 : "auto"} />
              </Link>
            </Navbar.Brand>
            {hideall ? (
              <div className="">
                {Width ? (
                  ""
                ) : (
                  <div className="d-flex position-relative align-items-center">
                    {user ? (
                      <Link
                        to={`/profile`}
                        className={
                          hide
                            ? "d-flex justify-content-center flex-wrap nav-link p-0 pe-2"
                            : "d-none"
                        }
                      >
                        <img className="" src={prof} width={20} />
                      </Link>
                    ) : (
                      <Button
                        variant="transparent"
                        className={
                          hide
                            ? " d-flex justify-content-center flex-wrap nav-link p-0 pe-2"
                            : "d-none"
                        }
                        onClick={() => setOpen(!Open)}
                      >
                        {" "}
                        <img className="" src={prof} width={20} />
                      </Button>
                    )}
                    <Link
                      to="/cart"
                      className={
                        hide
                          ? "d-flex justify-content-center flex-wrap nav-link p-0 pe-2" 
                          : "d-none"
                      }
                    >
                      {" "}
                      {total !== 0 ? (
                        <Badge badgeContent={Number(total)} color="warning">
                          <img className="" src={cart} width={25}/>
                        </Badge>
                      ) : (
                        <img className="" src={cart} width={25}/>
                      )}
                    </Link>
                    <Container className="d-flex flex-wrap new-search-form p-0 ">
                      {/* <div class="dropdown1"> */}
                      {hide ? (
                        <button
                          className="nobr-bttn p-0 gold mb-1"
                          onClick={() => setHide(false)}
                        >
                          <SearchIcon sx={{color: "orange"}}/>
                        </button>
                      ) : (
                        <div className="d-flex position-relative">
                          <Form.Control
                            placeholder="Поиск..."
                            id="search"
                            aria-label="Search"
                            className="dropdown-search"
                            value={wordEntered}
                            onChange={handleFilter}
                          />
                          {filteredData.length !== 0 && (
                            <div className="dropdown-search-content">
                              {filteredData
                                .slice(0, 5)
                                .filter(
                                  (Items) => Items.lng === myLocalStorageData
                                )
                                .map((Items) => (
                                  <SearchComp
                                    Items={Items}
                                    key={Items._id}
                                    addToCompare={addToCompare}
                                    removeFromCompare={removeFromCompare}
                                    selectedItems={selectedItems}
                                    onAdd={() => onAdd(Items)}
                                    onRemoveFromPage={() =>
                                      onRemoveFromPage(Items._id)
                                    }
                                  ></SearchComp>
                                ))}
                            </div>
                          )}
                          <button
                            className="nobr-bttn new-pos-abs"
                            onClick={() => setHide(true)}
                          >
                            <CloseIcon sx={{paddingBottom: "5px", marginBottom:"1px"}}/>
                          </button>
                        </div>
                      )}
                    </Container>
                  </div>
                )}
              </div>
            ) : (
              " "
            )}

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              {Width ? (
                <div className="position-relative">
                  {isVisible && (
                    <div>
                      <img className="img-cat" src={catnav} />
                      <NavDropdown
                        className="navdrop me-0 position-relative"
                        aria-expanded="true"
                        title={`   ${t("head0")}`}
                        id="basic-nav-dropdown"
                      >
                        <Container className="menu">
                          <MenuItemsDisplay></MenuItemsDisplay>
                        </Container>
                      </NavDropdown>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <img className="img-cat-adapt" src={catnav} />
                  <NavDropdown
                    className="navdrop me-0 mt-2 position-relative"
                    aria-expanded="true"
                    id="basic-nav-dropdown"
                    onClick={OpenIt}
                    title={`   ${t("head0")}`}
                  >
                    <MobileMenu
                      Width={Width}
                      Vision={Vision}
                      setVision={setVision}
                      Close={Close}
                    ></MobileMenu>
                  </NavDropdown>
                </div>
              )}
              <Nav className="d-flex flex-row flex-wrap justify-content-center">
                <Nav.Item className="d-flex align-items-center m-2">
                  <img src={phone} />
                  <a className="black real-no-dec" href="tel:+37379559663">
                    +373&#x2212;79&#x2212;559&#x2212;663
                  </a>
                </Nav.Item>
                <div className="vis-inv p-0 mt-2">
                  <div className="d-flex flex-row">
                    <button
                      className="d-flex align-items-center nobr-bttn"
                      onClick={() => changeLanguage("ru")}
                    >
                      <img width={12} height={12} src={flagR} />
                      Ru
                    </button>
                    <button
                      className="d-flex align-items-center nobr-bttn"
                      onClick={() => changeLanguage("ro")}
                    >
                      <img width={12} height={12} src={flagRo} />
                      Ro
                    </button>
                    <button
                      className="d-flex align-items-center nobr-bttn"
                      onClick={() => changeLanguage("en")}
                    >
                      <img width={12} height={12} src={flagEn} />
                      En
                    </button>
                  </div>{" "}
                </div>
              </Nav>
              <Container className={Width ? "d-flex flex-wrap " : "d-none"}>
                {/* <div class="dropdown1"> */}
                <Form.Control
                  placeholder="Поиск..."
                  id="search"
                  aria-label="Search"
                  className="dropdown-search"
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
                    {filteredData
                      .slice(0, 5)
                      .filter((Items) => Items.lng === myLocalStorageData)
                      .map((Items) => (
                        <SearchComp
                          Items={Items}
                          key={Items._id}
                          addToCompare={addToCompare}
                          removeFromCompare={removeFromCompare}
                          selectedItems={selectedItems}
                          onAdd={() => onAdd(Items)}
                          onRemoveFromPage={() => onRemoveFromPage(Items._id)}
                        ></SearchComp>
                      ))}
                  </div>
                )}
              </Container>
              <Nav className="main-nav-inv">
                <Link
                  to="/compare"
                  className="d-flex justify-content-center flex-wrap nav-link text-center ps-1"
                >
                  {selectedItems.length !== 0 ? (
                    <Badge badgeContent={selectedItems.length} color="warning">
                      <img className="pe-2" src={com} />
                    </Badge>
                  ) : (
                    <img className="pe-2" src={com} />
                  )}
                  {t("head1")}
                </Link>
                <Link
                  to="/cart"
                  className="d-flex justify-content-center flex-wrap nav-link"
                >
                  {" "}
                  {total !== 0 ? (
                    <Badge badgeContent={Number(total)} color="warning">
                      <img className="pe-1" src={cart} />
                    </Badge>
                  ) : (
                    <img className="pe-2" src={cart} />
                  )}{" "}
                  {t("head2")}
                </Link>
                {user ? (
                  <Link
                    to={`/profile`}
                    className="d-flex justify-content-center flex-wrap nav-link ps-1 "
                  >
                    <img className="nav-adapt" src={prof} />
                    {t("head3/1")}
                  </Link>
                ) : (
                  <Button
                    variant="transparent"
                    className=" d-flex justify-content-center flex-wrap nav-link ps-1 "
                    onClick={() => setOpen(!Open)}
                  >
                    {" "}
                    <img className="nav-adapt" src={prof} /> {t("head3/2")}
                  </Button>
                )}
              </Nav>
              <Nav className="me-auto vis-inv">
                <Link className="nav-link white" to="/about">
                  {t("nav1")}
                </Link>
                <Link className="nav-link white" to="/contacts">
                  {t("nav2")}
                </Link>
                <Link className="nav-link gold" to="/sales">
                  {t("nav3")}
                </Link>
                <Link className="nav-link white" to="/partnership">
                  {t("nav4")}
                </Link>
                <Link className="nav-link white" to="/brands">
                  {t("nav5")}
                </Link>
                <Link className="nav-link gold" to="/promotions">
                  {t("nav6")}
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="smth sticky-top"></Container>
      </Navbar>
    </>
  );
}
