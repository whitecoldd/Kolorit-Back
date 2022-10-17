import { Container, Navbar, Nav, Image, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { ProfileMenu } from "../comps/ProfileMenu";
import disclogo from "../assets/disc-logo.svg";
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
import Barcode from "react-barcode";
const DiscountCard = () => {
  const [Items, setItems] = useState([]);
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
                        className="menu-profile-text nav-link"
                      >
                        {t("addresses")}
                      </Link>
                      <Link
                        to="/profile"
                        className="menu-profile-text gold nav-link"
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
                <h1>{t("disc")}</h1>
                <Container className="d-flex justify-content-start pt-4 pb-4 ps-0">
                  {Items.discountcard?.map((disc) => (
                    <>
                      <Container className="discountbox">
                        <div className="d-flex justify-content-between ps-4 pe-3 discounttop">
                          <img src={disclogo} />
                          <h1>{disc.discountPercent * 100}%</h1>
                        </div>
                        <p className="ps-4 pt-5">{disc.discountId}</p>
                        <div className="d-flex justify-content-center pt-3">
                          <Barcode
                            value={disc.discountId}
                            background="transparent"
                            displayValue={false}
                          />
                        </div>
                      </Container>
                    </>
                  ))}
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default DiscountCard;
