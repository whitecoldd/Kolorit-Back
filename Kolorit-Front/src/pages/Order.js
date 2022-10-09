import { Container, Navbar, Nav, Image, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import orderbox from "../assets/orderbox.png";
import bigprof from "../assets/bigprof.png";
import heart from "../assets/heart.png";
import profcart from "../assets/profcart.png";
import { ProfileMenu } from "../comps/ProfileMenu";
import { userRequest } from "../requests/request";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ItemModel from "../comps/ItemModel";
import { useTranslation } from "react-i18next";
import home from "../assets/home.png";
import shop from "../assets/shop.png";
import profile from "../assets/profile.png";
import cart from "../assets/cart1.png";
const Order = () => {
  const [Items, setItems] = useState({});
  const user = useSelector((state) => state.user.currentUser);
  const email = useSelector((state) => state.user.currentUser.email);
  const phone = useSelector((state) => state.user.currentUser.phone);
  const firstname = useSelector((state) => state.user.currentUser.fname);
  const lastname = useSelector((state) => state.user.currentUser.lname);
  const username = useSelector((state) => state.user.currentUser.username);
  const id = useSelector((state) => state.user.currentUser._id);
  const location = useLocation();
  const _id = location.pathname.split("/")[2];
  const { t } = useTranslation();

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await userRequest.get(`/api/order/${_id}`);
        setItems(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getItems();
  }, [id]);
  let today = new Date();

  const date =
    today.getDate() +
    "-" +
    parseInt(today.getMonth() + 1) +
    "-" +
    today.getFullYear();
  const orderBox = [
    [t("newe"),1],
    [t("ordpend"), 2],
    [t("ordtaken"), 3],
    [t("ordsent"), 4],
    [t("ordgot"), 5],
  ];
  const [order5, setOrder5] = useState(true);
  const [order1, setOrder1] = useState(true);
  const [order2, setOrder2] = useState(true);
  const [order3, setOrder3] = useState(true);
  const [order4, setOrder4] = useState(true);
  useEffect(() => {
    const handleOrder = () => {
      if (Items.status === t("ordgot")) setOrder5(false);
      else setOrder5(true);
    };

    handleOrder();
  }, [Items.status]);
  useEffect(() => {
    const handleOrder = () => {
      if (Items.status === t("newe")) setOrder1(false);
      else setOrder1(true);
    };

    handleOrder();
  }, [Items.status]);
  useEffect(() => {
    const handleOrder = () => {
      if (Items.status === t("ordpend")) setOrder2(false);
      else setOrder2(true);
    };

    handleOrder();
  }, [Items.status]);
  useEffect(() => {
    const handleOrder = () => {
      if (Items.status === t("ordtaken")) setOrder3(false);
      else setOrder3(true);
    };

    handleOrder();
  }, [Items.status]);
  useEffect(() => {
    const handleOrder = () => {
      if (Items.status === t("ordsent")) setOrder4(false);
      else setOrder4(true);
    };

    handleOrder();
  }, [Items.status]);

  return (
    <>
      <Container className="profile d-flex mb-5">
        <Container className="d-flex profhandle">
          <Container className="menu-profile ps-0 pt-3 mb-3">
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav collapseOnSelect className="d-flex flex-wrap ">
                  <Nav.Item>
                    <Link to="/profile" className="black nav-link ps-0">
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
                    <Link to="/orders" className="black nav-link lineleft">
                      <Container className="d-flex align-items-center prof-item ">
                        <Image src={shop}></Image>
                        <Link to="/orders" className="black nav-link">
                          {t("ord")}
                        </Link>
                      </Container>
                    </Link>
                    <Container className="d-flex flex-column prof-item ">
                      <Link
                        to="/orders"
                        className="menu-profile-text nav-link orange"
                      >
                        {t("ord")}
                      </Link>
                      <Link to="/orders" className="menu-profile-text nav-link">
                        {t("acorder")}
                      </Link>
                    </Container>
                    <Link to="/profileinfo" className="black nav-link">
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
          <Container>
            <Container>
              <Container className="menu-profile-ext ps-3 orderhandle">
                <Link to="/orders" className="no-dec">
                  <h1 className="ps-3 d-flex align-items-center">
                    {" "}
                    <h3 className="m-0 p-0">&#60;</h3> {t("ord")} №{Items._id}
                  </h1>
                </Link>
                <Container className="d-flex justify-content-around">
                  
                    <p className={order1 ? "smth black" : "smthg green"}>
                      {t("ord")}: {t("newe")}
                    </p>
                    <p className={order2 ? "smth black" : "smthg green"}>
                      {t("ord")}: {t("ordpend")}
                    </p>
                    <p className={order3 ? "smth black" : "smthg green"}>
                      {t("ord")}: {t("ordtaken")}
                    </p>
                    <p className={order4 ? "smth black" : "smthg green"}>
                      {t("ord")}: {t("ordsent")}
                    </p>
                    <p className={order5 ? "smth black" : "smthg green"}>
                      {t("ord")}: {t("ordgot")}
                    </p>
                  
                </Container>
                <Container className="d-flex">
                  <Container className="p-0">
                    <Container className="smth p-0">
                      {Items?.productId?.map((item) => (
                        <>
                          <Container className="d-flex justify-content-between align-items-center w-100 me-2">
                            <img
                              className=""
                              width={60}
                              height={60}
                              src={item.img}
                            ></img>
                            <div className="d-flex">
                              <h5 className="black bold pe-2">{item.name}</h5>
                              <h5 className="black bold">
                                {item.salePrice} {item.currency}
                              </h5>
                            </div>
                            <div>
                              <h5 className="grey">{item.qty} шт. </h5>
                            </div>
                          </Container>
                        </>
                      ))}
                    </Container>
                    <Container className="d-flex">
                      <Container className="mt-3">
                        <p className="black">
                          {t("priceall")} {Items?.sum}
                        </p>
                        <p className="black">
                          {t("qtyall")} {Items.quantity}
                        </p>
                        <p className="black">{t("sale")} 0</p>
                        <p className="black">{t("del")} 0</p>
                        <h4 className="orange">
                          {t("all")} {Items?.sum}
                        </h4>
                      </Container>
                    </Container>
                  </Container>
                  <Container className="tablenew d-flex flex-column align-items-baseline p-3 w-75">
                    <h3 className="black">{t("orderdet")} </h3>
                    <h4 className="black d-flex flex-column">
                      {t("addressdel")} <p className="black">{Items.address}</p>
                    </h4>
                    <h4 className="black d-flex flex-column">
                      {t("paytype")} <p className="black">{Items.payment}</p>{" "}
                    </h4>
                    <h4 className="black d-flex flex-column">
                      {t("continfo")}
                      <p className="black">
                        {firstname} {lastname}
                      </p>{" "}
                      {phone} {email}
                    </h4>
                    <Button variant="outline-warning">{t("payonline")}</Button>
                  </Container>
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default Order;
