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
        const res = await userRequest.get(`/order/${_id}`);
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
  return (
    <>
      <Container className="profile d-flex mb-5">
        <Container className="d-flex profhandle">
          <Container className="menu-profile pt-3 mb-3">
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav collapseOnSelect className="d-flex flex-column">
                  {ProfileMenu.map((item) => (
                    <Nav.Item key={item.id}>
                      <Link to="/profile">
                        <Container className="d-flex align-items-center prof-item">
                          <Image src={item.img}></Image>
                          <Link to="/profile" className="black nav-link">
                            {item.title}
                          </Link>
                        </Container>
                      </Link>
                      <Container className="d-flex flex-column prof-item">
                        <Link to="/profileinfo" className="menu-profile-text">
                          {item.subtitle1 || ""}
                        </Link>
                        <Link to="/addresses" className="menu-profile-text">
                          {item.subtitle2 || ""}
                        </Link>
                        <Nav.Link className="menu-profile-text">
                          {item.subtitle3 || ""}
                        </Nav.Link>
                        <Nav.Link className="menu-profile-text">
                          {item.subtitle4 || ""}
                        </Nav.Link>
                      </Container>
                    </Nav.Item>
                  ))}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Container>
          <Container>
            <Container>
              <Container className="menu-profile-ext ps-3 orderhandle">
                <Link to="/orders">
                  <h1 className="ps-3">
                    {" "}
                    &#60; {t("ord")} №{Items._id}
                  </h1>
                </Link>
                <Container className="d-flex justify-content-around">
                  <p className="smthg black">{t("ordtaken")}</p>
                  <p className="smthg black">{t("ordpend")}</p>
                  <p className="smthg black">{t("ordgot")}</p>
                </Container>

                <Container className="smth">
                  {Items?.productId?.map((item) => (
                    <>
                      <Container className="d-flex justify-content-between align-items-center w-75">
                        <img
                          className="me-4"
                          width={60}
                          height={40}
                          src={item.img}
                        ></img>
                        <div className="me-4">
                          <h5 className="black bold">{item.name}</h5>
                        </div>
                        <div className="me-4">
                          <h5 className="black bold">
                            {item.salePrice} {item.currency}
                          </h5>
                        </div>
                      </Container>
                    </>
                  ))}
                </Container>
                <Container className="d-flex">
                  <Container className="mt-3">
                    <p className="black">
                      {t("priceall")}{" "}
                      {Items?.productId?.reduce(
                        (salePrice, item) =>
                          salePrice + item.qty * item.salePrice,
                        0
                      )}
                    </p>
                    <p className="black">
                      {t("qtyall")} {Items.quantity}
                    </p>
                    <p className="black">{t("sale")} 0</p>
                    <p className="black">{t("del")} 0</p>
                    <h4 className="orange">
                      {t("all")}{" "}
                      {Items?.productId?.reduce(
                        (salePrice, item) =>
                          salePrice + item.qty * item.salePrice,
                        0
                      )}
                    </h4>
                  </Container>
                  <Container className="tablenew d-flex flex-column align-items-baseline mt-4 p-3">
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
