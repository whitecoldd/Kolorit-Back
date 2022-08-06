import { Container, Navbar, Nav, Image, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import orderbox from "../assets/orderbox.png";
import bigprof from "../assets/bigprof.png";
import heart from "../assets/heart.png";
import redact from "../assets/redact.svg";
import { ProfileMenu } from "../comps/ProfileMenu";
import { userRequest } from "../requests/request";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logout, updateUser } from "../redux/apiCalls";
import home from "../assets/home.png";
import shop from "../assets/shop.png";
import profile from "../assets/profile.png";
import cart from "../assets/cart1.png";
const Addresses = () => {
  const [Items, setItems] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const email = useSelector((state) => state.user.currentUser.email);
  const phone = useSelector((state) => state.user.currentUser.phone);
  const firstname = useSelector((state) => state.user.currentUser.fname);
  const lastname = useSelector((state) => state.user.currentUser.lname);
  const username = useSelector((state) => state.user.currentUser.username);
  const id = useSelector((state) => state.user.currentUser._id);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState([]);
  const history = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await userRequest.get(`/api/user/find/${id}`);
        setItems(res.data);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getItems();
  }, [id]);
  const [show, setShow] = useState(true);
  const ShowClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  const [showS, setShowS] = useState(true);
  const ShowClickS = (e) => {
    e.preventDefault();
    setShowS(!showS);
  };
  const handleClick = (e) => {
    e.preventDefault();
    const product = { ...inputs };
    updateUser(id, product, dispatch);
  };
  return (
    <>
      <Container className="profile d-flex mb-3">
        <Container className="d-flex profhandle">
          <Container className="menu-profile pt-3 mb-3">
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav collapseOnSelect className="d-flex flex-column">
                <Nav.Item>
                    <Link to="/profile" className="black nav-link">
                      <Container className="d-flex align-items-center prof-item">
                        <Image src={home}></Image>
                        <Link
                          to="/profile"
                          className="black nav-link real-no-dec"
                        >
                          Личный Кабинет
                        </Link>
                      </Container>
                    </Link>
                    <Link to="/orders" className="black nav-link">
                      <Container className="d-flex align-items-center prof-item">
                        <Image src={shop}></Image>
                        <Link to="/orders" className="black nav-link">
                          Заказы
                        </Link>
                      </Container>
                    </Link>
                    <Container className="d-flex flex-column prof-item">
                      <Link to="/orders" className="menu-profile-text nav-link">
                        Все заказы
                      </Link>
                      <Link to="/orders" className="menu-profile-text nav-link">
                        Активные заказы
                      </Link>
                    </Container>
                    <Link to="/profile" className="black nav-link">
                      <Container className="d-flex align-items-center prof-item">
                        <Image src={profile}></Image>
                        <Link to="/profile" className="black nav-link">
                          Профиль
                        </Link>
                      </Container>
                    </Link>
                    <Container className="d-flex flex-column prof-item">
                      <Link
                        to="/profileinfo"
                        className="menu-profile-text nav-link"
                      >
                        Личные данные
                      </Link>
                      <Link
                        to="/addresses"
                        className="menu-profile-text nav-link"
                      >
                        Мои адресса
                      </Link>
                      <Link
                        to="/profile"
                        className="menu-profile-text nav-link"
                      >
                        Накопительная карта
                      </Link>
                    </Container>
                    <Link to="/orders" className="black nav-link">
                      <Container className="d-flex align-items-center prof-item">
                        <Image src={cart}></Image>
                        <Link to="/orders" className="black nav-link">
                          Товары
                        </Link>
                      </Container>
                    </Link>
                    <Container className="d-flex flex-column prof-item">
                      <Link
                        disabled
                        to="/"
                        className="menu-profile-text nav-link"
                      >
                        Избранное
                      </Link>
                      <Link
                        to="/"
                        className="menu-profile-text nav-link"
                      >
                        Просмотренные товары
                      </Link>
                      <Link
                        to="/cart"
                        className="menu-profile-text nav-link"
                      >
                        Корзина
                      </Link>
                    </Container>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Container>
          <Container>
            <Container>
              <Container className="menu-profile-ext ps-4">
                <h1>{t("addresses")}</h1>
                <Container className="d-flex">
                  <Container className="addressbox pt-3">
                    {showS ? (
                      <>
                        {" "}
                        <Container className="d-flex justify-content-between">
                          <h3 className="gold">{t("address")} 1</h3>

                          <button className="removeCart" onClick={ShowClickS}>
                            <img src={redact}></img>
                          </button>
                        </Container>
                        <ul className="ps-4 ">
                          <li className="">{Items.address}</li>
                          <li>
                            {Items.fname} {Items.lname}, {Items.phone}
                          </li>
                        </ul>{" "}
                      </>
                    ) : (
                      <>
                        {" "}
                        <Container className="d-flex justify-content-between">
                          <h3 className="gold">{t("address")} 1</h3>

                          <button className="removeCart" onClick={ShowClickS}>
                            <img src={redact}></img>
                          </button>
                        </Container>
                        <ul className="ps-4 ">
                          <li>
                            <Container className="d-flex p-0">
                              <input
                                type="text"
                                id="addressform"
                                className="form-control "
                                name="address"
                                onChange={handleChange}
                                placeholder="Адрес"
                              ></input>
                              <button
                                className="bttn-sm"
                                onClick={handleClick}
                              >
                                &#10004;
                              </button>
                            </Container>
                          </li>
                          <li>
                            {Items.fname} {Items.lname}, {Items.phone}
                          </li>
                        </ul>{" "}
                      </>
                    )}
                  </Container>
                </Container>
                <Container className="d-flex justify-content-end mt-4">
                  <Form>
                    {show ? (
                      <button
                        className="removeCart d-flex align-items-baseline"
                        onClick={ShowClick}
                      >
                        <img src={redact}></img> Новый Адрес
                      </button>
                    ) : (
                      <Container className="d-flex align-items-baseline">
                        <input
                          type="text"
                          id="addressform"
                          className="form-control w-auto "
                          name="address"
                          onChange={handleChange}
                          placeholder="Адрес"
                        ></input>
                        <button
                          className="removeCart d-flex align-items-baseline"
                          onClick={ShowClick}
                        >
                          <img src={redact}></img>
                        </button>
                      </Container>
                    )}
                  </Form>
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default Addresses;
