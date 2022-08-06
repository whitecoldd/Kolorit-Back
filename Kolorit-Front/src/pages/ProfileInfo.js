import { Container, Navbar, Nav, Image, Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { ProfileMenu } from "../comps/ProfileMenu";
import { userRequest } from "../requests/request";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import redact from "../assets/redact.svg";
import { deleteUser, updateUser } from "../redux/apiCalls";
import home from "../assets/home.png";
import shop from "../assets/shop.png";
import profile from "../assets/profile.png";
import cart from "../assets/cart1.png";
const Profile = () => {
  const [Items, setItems] = useState({});
  const user = useSelector((state) => state.user.currentUser);
  const email = useSelector((state) => state.user.currentUser.email);
  const phone = useSelector((state) => state.user.currentUser.phone);
  const firstname = useSelector((state) => state.user.currentUser.fname);
  const lastname = useSelector((state) => state.user.currentUser.lname);
  const username = useSelector((state) => state.user.currentUser.username);
  const id = useSelector((state) => state.user.currentUser._id);
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await userRequest.get(`/api/user/find/${id}`);
        setItems(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getItems();
  }, [id]);
  const handleDelete = (e) => {
    e.preventDefault();
    deleteUser(id, dispatch);
    localStorage.clear();
    history("/");
    // useEffect(() => {
    //     const getItems = async () => {
    //         try {
    //             const res = await userRequest.delete(`/user/find/${id}`)
    //         } catch (e) {
    //             console.log(e)
    //         }
    //     }
    //     getItems()
    // }, [id])
  };

  const [inputs, setInputs] = useState([]);
  const handleClick = (e) => {
    e.preventDefault();
    const product = { ...inputs };
    updateUser(id, product, dispatch);
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const { t } = useTranslation();

  const [show, setShow] = useState(true);
  const [showE, setShowE] = useState(true);
  const [showP, setShowP] = useState(true);
  const ShowClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  const ShowClickE = (e) => {
    e.preventDefault();
    setShowE(!showE);
  };
  const ShowClickP = (e) => {
    e.preventDefault();
    setShowP(!showP);
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
                      <Link to="/" className="menu-profile-text nav-link">
                        Просмотренные товары
                      </Link>
                      <Link to="/cart" className="menu-profile-text nav-link">
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
              <Form>
                <Container className="menu-profile-ext ps-3">
                  <h1 className="ps-3">{t("selfdata")}</h1>
                  <Container>
                    <p className="gray">{t("init")}</p>

                    {show ? (
                      <Container className="d-flex justify-content-start align-items-baseline p-0">
                        <h5 className="black">
                          {Items.fname} {Items.lname}
                        </h5>

                        <button className="removeCart" onClick={ShowClick}>
                          <img src={redact}></img>
                        </button>
                      </Container>
                    ) : (
                      <Container className="d-flex align-items-baseline p-0 me-0">
                        <input
                          type="text"
                          className="form-control w-auto"
                          name="fname"
                          value={inputs.fname}
                          onChange={handleChange}
                          placeholder="Имя"
                        />
                        <input
                          type="text"
                          className="form-control w-auto"
                          name="lname"
                          value={inputs.lname}
                          onChange={handleChange}
                          placeholder="Фамилия"
                        />
                        <button className="removeCart" onClick={ShowClick}>
                          <img src={redact}></img>
                        </button>
                      </Container>
                    )}
                  </Container>
                  <Container>
                    <p className="gray">E-mail</p>
                    {showE ? (
                      <Container className="d-flex align-items-baseline p-0 me-0">
                        <h5 className="black">{Items.email}</h5>
                        <button className="removeCart" onClick={ShowClickE}>
                          <img src={redact}></img>
                        </button>
                      </Container>
                    ) : (
                      <Container className="d-flex align-items-baseline p-0 me-0">
                        <input
                          type="text"
                          className="form-control w-auto"
                          name="email"
                          value={inputs.email}
                          onChange={handleChange}
                          placeholder="E-mail адрес"
                        />
                        <button className="removeCart" onClick={ShowClickE}>
                          <img src={redact}></img>
                        </button>
                      </Container>
                    )}
                  </Container>
                  <Container>
                    <p className="gray">{t("phone")}</p>
                    {showP ? (
                      <Container className="d-flex align-items-baseline p-0 me-0">
                        <h5 className="black">{Items.phone}</h5>
                        <button className="removeCart" onClick={ShowClickP}>
                          <img src={redact}></img>
                        </button>
                      </Container>
                    ) : (
                      <Container className="d-flex align-items-baseline p-0 me-0">
                        <input
                          type="text"
                          className="form-control w-auto"
                          name="phone"
                          value={inputs.phone}
                          onChange={handleChange}
                          placeholder="Номер телефона"
                        />
                        <button className="removeCart" onClick={ShowClickP}>
                          <img src={redact}></img>
                        </button>
                      </Container>
                    )}
                  </Container>
                  <Container>
                    <Form>
                      <p className="gray">{t("changepw")}</p>
                      <Container className="d-flex flex-wrap p-0">
                        <Container className="d-flex p-0">
                          <Form.Group>
                            <Form.Control
                              className="w-auto"
                              type="password"
                              placeholder="Старый пароль"
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              className="w-auto"
                              onChange={handleChange}
                              name="password"
                              type="password"
                              placeholder="Новый пароль"
                            />
                          </Form.Group>
                        </Container>
                        <Form.Group className="d-flex mt-3">
                          <Form.Control
                            className="bttn-cart"
                            onClick={handleClick}
                            type="submit"
                            value="Сохранить"
                          />
                        </Form.Group>
                      </Container>
                    </Form>

                    <Container className="mt-5">
                      <Button
                        variant="transparent"
                        onClick={handleDelete}
                        className="gray"
                      >
                        &#10060; {t("delacc")}
                      </Button>
                    </Container>
                  </Container>
                </Container>
              </Form>
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default Profile;
