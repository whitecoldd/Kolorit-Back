import { Container, Navbar, Nav, Image, Table } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import orderbox from "../assets/orderbox.png";
import bigprof from "../assets/bigprof.png";
import heart from "../assets/heart.png";
import profcart from "../assets/profcart.png";
import { ProfileMenu } from "../comps/ProfileMenu";
import { userRequest } from "../requests/request";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import home from "../assets/home.png";
import shop from "../assets/shop.png";
import profile from "../assets/profile.png";
import cart from "../assets/cart1.png";
import { useTranslation } from "react-i18next";

const Orders = () => {
  const [Items, setItems] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const email = useSelector((state) => state.user.currentUser.email);
  const phone = useSelector((state) => state.user.currentUser.phone);
  const firstname = useSelector((state) => state.user.currentUser.fname);
  const lastname = useSelector((state) => state.user.currentUser.lname);
  const username = useSelector((state) => state.user.currentUser.username);
  const id = useSelector((state) => state.user.currentUser._id);
  const { t } = useTranslation();
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await userRequest.get(`/api/order/find/${username}`);
        setItems(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getItems();
  }, [username]);
  let today = new Date();

  let date =
    today.getDate() +
    "-" +
    parseInt(today.getMonth() + 1) +
    "-" +
    today.getFullYear();
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
              <Container className="menu-profile-ext ps-3">
                <Table striped hover className="tablenew p-3">
                  <thead>
                    <tr>
                      <th className="hid">#</th>
                      <th>{t("prod")}</th>
                      <th>{t("date")}</th>
                      <th>{t("price")}</th>
                      <th>{t("status")}</th>
                      <th>.</th>
                    </tr>
                  </thead>

                  {Items.map((item) => {
                    if (item.userName === username) {
                      return (
                        <>
                          <tbody>
                            <th className="hid">{item._id}</th>
                            <th>{item.delType}</th>
                            <th>{item.createdAt}</th>
                            <th>
                              {item?.productId?.reduce(
                                (salePrice, item) =>
                                  salePrice + item.qty * item.salePrice,
                                0
                              )}{" "}
                              MDL
                            </th>
                            <th>{item.status}</th>
                            <Link to={`/order/${item._id}`}>
                              <th>&#8594;</th>
                            </Link>
                          </tbody>
                        </>
                      );
                    }
                  })}
                </Table>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default Orders;
