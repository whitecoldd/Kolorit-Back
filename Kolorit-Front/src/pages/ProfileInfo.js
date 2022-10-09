import { Container, Navbar, Nav, Image, Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { ProfileMenu } from "../comps/ProfileMenu";
import { userRequest } from "../requests/request";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import redact from "../assets/redact.svg";
import { deleteUser, updateUser, logoutFunc } from "../redux/apiCalls";
import home from "../assets/home.png";
import shop from "../assets/shop.png";
import cross from "../assets/cross.svg";
import profile from "../assets/profile.png";
import cart from "../assets/cart1.png";
import Modal from "react-modal";
const Profile = () => {
  const [Items, setItems] = useState({});
  const user = useSelector((state) => state.user.currentUser);
  const email = useSelector((state) => state.user.currentUser.email);
  const phoney = useSelector((state) => state.user.currentUser.phone);
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
    logoutFunc(dispatch);
    history("/");
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
  const customStyles = {
    content: {
      top: "35%",
      left: "50%",
      right: "50%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      height: "200px",
      color: "white",
      background:
        "radial-gradient(circle, rgba(250,190,77,1) 20%, rgba(213,213,213,1) 81%) ",
      borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    overlay: {
      zIndex: 1000,
    },
  };

  const [Open1, setOpen1] = useState(false);

  return (
    <>
      <Container className="profile d-flex mb-3">
        <Container className="d-flex profhandle">
          <Container className="menu-profile pt-3 mb-3 ps-0">
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
              <Nav collapseOnSelect className="d-flex flex-wrap">
                  <Nav.Item>
                    <Link to="/profile" className="black nav-link ">
                      <Container className="d-flex align-items-center  prof-item">
                        <Image src={home}></Image>
                        <Link
                          to="/profile"
                          className="black nav-link real-no-dec"
                        >
                          {t('self')}
                        </Link>
                      </Container>
                    </Link>
                    <Link to="/orders" className="black nav-link">
                      <Container className="d-flex align-items-center prof-item">
                        <Image src={shop}></Image>
                        <Link to="/orders" className="black nav-link">
                          {t("ord")}
                        </Link>
                      </Container>
                    </Link>
                    <Container className="d-flex flex-column prof-item">
                      <Link to="/orders" className="menu-profile-text nav-link">
                      {t("ord")}
                      </Link>
                      <Link to="/orders" className="menu-profile-text nav-link">
                      {t("acorder")}
                      </Link>
                    </Container>
                    <Link to="/profileinfo" className="black nav-link lineleft">
                      <Container className="d-flex align-items-center prof-item">
                        <Image src={profile}></Image>
                        <Link to="/profileinfo" className="gold nav-link">
                          {t("head3/1")}
                        </Link>
                      </Container>
                    </Link>
                    <Container className="d-flex flex-column prof-item">
                      <Link
                        to="/profileinfo"
                        className="menu-profile-text nav-link"
                      >
                        {t("selfdata")}
                      </Link>
                      <Link
                        to="/addresses"
                        className="menu-profile-text nav-link"
                      >
                        {t("addresses")}
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
                          {t("prod")}
                        </Link>
                      </Container>
                    </Link>
                    <Container className="d-flex flex-column prof-item">
                      <Link
                        disabled
                        to=""
                        className="menu-profile-text nav-link"
                      >
                        {t('fav')}
                      </Link>
                      <Link to="" className="menu-profile-text nav-link">
                        {t("more1")}
                      </Link>
                      <Link to="/cart" className="menu-profile-text nav-link">
                        {t("head2")}
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
                    <p className="gray mb-0">{t("init")}</p>

                    {show ? (
                      <Container className="d-flex justify-content-start align-items-baseline p-0">
                        <h5 className="black mb-4">
                          {firstname} {lastname}
                        </h5>

                        <button className="removeCart" onClick={ShowClick}>
                          <img src={redact}></img>
                        </button>
                      </Container>
                    ) : (
                      <Container className="d-flex align-items-baseline profdata p-0 me-0">
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
                          className="form-control w-auto mb-4"
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
                    <p className="gray mb-0">E-mail</p>
                    {showE ? (
                      <Container className="d-flex align-items-baseline p-0 me-0">
                        <h5 className="black mb-4">{email}</h5>
                        <button className="removeCart" onClick={ShowClickE}>
                          <img src={redact}></img>
                        </button>
                      </Container>
                    ) : (
                      <Container className="d-flex align-items-baseline p-0 me-0">
                        <input
                          type="text"
                          className="form-control w-auto mb-4"
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
                    <p className="gray mb-0">{t("phone")}</p>
                    {showP ? (
                      <Container className="d-flex align-items-baseline p-0 me-0">
                        <h5 className="black mb-4">{phoney}</h5>
                        <button className="removeCart" onClick={ShowClickP}>
                          <img src={redact}></img>
                        </button>
                      </Container>
                    ) : (
                      <Container className="d-flex align-items-baseline p-0 me-0">
                        <input
                          type="text"
                          className="form-control w-auto mb-4"
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
                      <p className="gray mb-0">{t("changepw")}</p>
                      <Container className="d-flex flex-wrap p-0">
                        <Container className="d-flex p-0 psw">
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
                        onClick={() => setOpen1(true)}
                        className="gray d-flex align-items-center"
                      >
                        <img src={cross}></img> {t("delacc")}
                      </Button>
                      <Modal isOpen={Open1} style={customStyles}>
                        <h2 className="text-center mb-2">{t("confdel")}</h2>
                        <div className="d-flex justify-content-around w-100">
                          <button className="bttn-more" onClick={handleDelete}>
                            {t("yes")}
                          </button>
                          <button
                            className="bttn-more"
                            onClick={() => setOpen1(false)}
                          >
                            {t("no")}
                          </button>
                        </div>
                      </Modal>
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
