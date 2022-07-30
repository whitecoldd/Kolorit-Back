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
        const res = await userRequest.get(`/order/find/${username}`);
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
                  {ProfileMenu.map((item) => (
                    <Nav.Item key={item.id}>
                      <Link to="/profile">
                        <Container className="d-flex align-items-center prof-item">
                          <Image src={item.img}></Image>
                          <Link
                            to="/profile"
                            className="black nav-link"
                          >
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
