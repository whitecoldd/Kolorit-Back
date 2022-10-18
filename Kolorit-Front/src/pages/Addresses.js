import { Container, Navbar, Nav, Image, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import orderbox from "../assets/orderbox.png";
import bigprof from "../assets/bigprof.png";
import plusbtn from "../assets/plusbtn.svg";
import redact from "../assets/redact.svg";
import { ProfileMenu } from "../comps/ProfileMenu";
import { userRequest } from "../requests/request";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logout, updateUser } from "../redux/apiCalls";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/userRedux";
import home from "../assets/home.png";
import shop from "../assets/shop.png";
import profile from "../assets/profile.png";
import cart from "../assets/cart1.png";
import { toast, ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
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
  if (typeof window !== "undefined") {
    injectStyle();
  }
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleAddress = (e) => {
    setAddress((prev) => {
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
  const [address, setAddress] = useState([{}]);
  const newAddress = { ...address };
  const handleClick = async (e) => {
    e.preventDefault();
    const product = { ...inputs, address: newAddress };
    dispatch(updateUserStart());
    try {
      const res = await userRequest.put(`/api/user/${id}/address`, product);
      dispatch(updateUserSuccess(res.data));
    } catch (err) {
      dispatch(updateUserFailure());
    }
  };
  const handleUpdateClick = async (e, addressid) => {
    e.preventDefault();
    const product = { ...inputs, address: newAddress };
    dispatch(updateUserStart());
    try {
      const res = await userRequest.put(`/api/user/${id}/address/${addressid}`, product);
      dispatch(updateUserSuccess(res.data));
      toast.success("Address has been updated");
    } catch (err) {
      dispatch(updateUserFailure());
      toast.error("Invalid Data");
    }
  };

  return (
    <>
      <Container className="profile d-flex mb-3">
        <Container className="d-flex profhandle">
          <Container className="menu-profile pt-3 ps-0 mb-3">
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav collapseOnSelect className="d-flex flex-wrap ">
                  <Nav.Item>
                    <Link to="/profile" className="black nav-link">
                      <Container className="d-flex align-items-center prof-item ">
                        <Image src={home}></Image>
                        <Link
                          to="/profile"
                          className="black nav-link real-no-dec"
                        >
                          {t("self")}
                        </Link>
                      </Container>
                    </Link>
                    <Link to="/orders" className="black nav-link ">
                      <Container className="d-flex align-items-center prof-item ">
                        <Image src={shop}></Image>
                        <Link to="/orders" className="black nav-link">
                          {t("ord_plural")}
                        </Link>
                      </Container>
                    </Link>
                    <Container className="d-flex flex-column prof-item">
                      <Link to="/orders" className="menu-profile-text nav-link">
                        {t("ord_plural")}
                      </Link>
                      <Link to="/orders" className="menu-profile-text nav-link">
                        {t("acorder")}
                      </Link>
                    </Container>
                    <Link to="/profileinfo" className="black nav-link lineleft">
                      <Container className="d-flex align-items-center prof-item">
                        <Image src={profile}></Image>
                        <Link to="/profileinfo" className="black nav-link">
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
                        className="menu-profile-text gold nav-link"
                      >
                        {t("addresses")}
                      </Link>
                      <Link
                        to="/discount"
                        className="menu-profile-text nav-link"
                      >
                        {t("disc")}
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
                        {t("fav")}
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
          <Container className="profile-menu-pads">
            <Container className="profile-menu-pads">
              <Container className="menu-profile-ext ps-4">
                <h1>{t("addresses")}</h1>
                <Container className="d-flex flex-wrap justify-content-start mt-5">
                  {showS ? (
                    <>
                      {Items.address?.map((address, i) => (
                        <>
                          <Container className="addressbox ms-0 mb-2">
                            <Container className="d-flex justify-content-between p-0">
                              <h5 className="gold">
                                {t("address")} {i + 1}
                              </h5>

                              <button
                                className="removeCart"
                                onClick={ShowClickS}
                              >
                                <img src={redact}></img>
                              </button>
                            </Container>
                            <ul className="ps-4 ">
                              <li className="">
                                {address.city}, {address.street}{" "}
                                {address.house || address.app}{" "}
                              </li>{" "}
                              <li>
                                {address.name}, {address.phone}
                              </li>
                              <li>{address.comm}</li>
                            </ul>
                          </Container>
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      {Items.address?.map((address, i) => (
                        <>
                          <Container className="d-flex justify-content-between">
                            <h3 className="gold">{t("address")} {i+1}</h3>

                            <button className="removeCart" onClick={ShowClickS}>
                              <img src={redact}></img>
                            </button>
                          </Container>
                          <ul className="ps-4 ">
                            <li>
                              <div>
                                {address.name} {address.phone}, {address.email}
                              </div>
                              <div>
                                {address.city} {address.street}, {address.house}
                                {address.app}
                              </div>
                              <div>{address.comm}</div>
                            </li>
                            <li>
                              <Container className="d-flex flex-wrap p-0">
                                <div className="d-flex justify-content-between w-90 mb-2">
                                  <input
                                    type="text"
                                    id="addressform"
                                    className="form-control w-auto "
                                    name="name"
                                    onChange={handleAddress}
                                    placeholder={t("uname")}
                                  ></input>
                                  <input
                                    type="text"
                                    id="addressform"
                                    className="form-control w-auto "
                                    name="phone"
                                    onChange={handleAddress}
                                    placeholder={t("phone")}
                                  ></input>
                                  <input
                                    type="text"
                                    id="addressform"
                                    className="form-control w-auto "
                                    name="email"
                                    onChange={handleAddress}
                                    placeholder="E-mail"
                                  ></input>
                                </div>
                                <div className="d-flex justify-content-between w-90 mb-2">
                                  <input
                                    type="text"
                                    id="addressform"
                                    className="form-control w-auto "
                                    name="city"
                                    onChange={handleAddress}
                                    placeholder={t("city")}
                                  ></input>
                                  <input
                                    type="text"
                                    id="addressform"
                                    className="form-control w-auto "
                                    name="street"
                                    onChange={handleAddress}
                                    placeholder={t("street")}
                                  ></input>
                                  <input
                                    type="text"
                                    id="addressform"
                                    className="form-control w-auto "
                                    name="house"
                                    onChange={handleAddress}
                                    placeholder={t("house")}
                                  ></input>
                                </div>
                                <div className="d-flex justify-content-between align-items-start w-90 ">
                                  <input
                                    type="text"
                                    id="addressform"
                                    className="form-control w-auto "
                                    name="app"
                                    onChange={handleAddress}
                                    placeholder={t("app")}
                                  ></input>
                                  <textarea
                                    type="text"
                                    id="addressform1"
                                    className="form-control w-auto "
                                    name="comm"
                                    rows={5}
                                    cols={60}
                                    onChange={handleAddress}
                                    placeholder={t("comm")}
                                  ></textarea>
                                </div>
                                <button
                                  className="bttn-cart"
                                  onClick={(e, addressid)=>handleUpdateClick(e, address._id)}
                                >
                                  {t("update")}
                                </button>
                              </Container>
                            </li>
                          </ul>
                        </>
                      ))}
                    </>
                  )}
                </Container>

                <Form>
                  {show ? (
                    <Container className="d-flex justify-content-start mt-4">
                      <button
                        className="removeCart d-flex align-items-center"
                        onClick={ShowClick}
                      >
                        <img src={plusbtn} className="me-2"></img> Добавить
                        новый адрес
                      </button>
                    </Container>
                  ) : (
                    <Container className="d-flex flex-column w-100 mt-5">
                      <div className="d-flex justify-content-between w-90 mb-2">
                        <input
                          type="text"
                          id="addressform"
                          className="form-control w-auto "
                          name="name"
                          onChange={handleAddress}
                          placeholder={t("uname")}
                        ></input>
                        <input
                          type="text"
                          id="addressform"
                          className="form-control w-auto "
                          name="phone"
                          onChange={handleAddress}
                          placeholder={t("phone")}
                        ></input>
                        <input
                          type="text"
                          id="addressform"
                          className="form-control w-auto "
                          name="email"
                          onChange={handleAddress}
                          placeholder="E-mail"
                        ></input>
                      </div>
                      <div className="d-flex justify-content-between w-90 mb-2">
                        <input
                          type="text"
                          id="addressform"
                          className="form-control w-auto "
                          name="city"
                          onChange={handleAddress}
                          placeholder={t("city")}
                        ></input>
                        <input
                          type="text"
                          id="addressform"
                          className="form-control w-auto "
                          name="street"
                          onChange={handleAddress}
                          placeholder={t("street")}
                        ></input>
                        <input
                          type="text"
                          id="addressform"
                          className="form-control w-auto "
                          name="house"
                          onChange={handleAddress}
                          placeholder={t("house")}
                        ></input>
                      </div>
                      <div className="d-flex justify-content-between align-items-start w-90 ">
                        <input
                          type="text"
                          id="addressform"
                          className="form-control w-auto "
                          name="app"
                          onChange={handleAddress}
                          placeholder={t("app")}
                        ></input>
                        <textarea
                          type="text"
                          id="addressform1"
                          className="form-control w-auto "
                          name="comm"
                          rows={5}
                          cols={60}
                          onChange={handleAddress}
                          placeholder={t("comm")}
                        ></textarea>
                      </div>
                      <div className="d-flex justify-content-end mt-3">
                        <button
                          className="bttn-empty-g me-2"
                          onClick={handleClick}
                        >
                          {t("save")}
                        </button>
                        <button className="bttn-cart" onClick={ShowClick}>
                          {t("cancel")}
                        </button>
                      </div>
                    </Container>
                  )}
                </Form>
                <ToastContainer />
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default Addresses;
