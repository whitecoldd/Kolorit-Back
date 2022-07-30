import { Container, Navbar, Nav, Image, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import orderbox from "../assets/orderbox.png";
import bigprof from "../assets/bigprof.png";
import heart from "../assets/heart.png";
import profcart from "../assets/profcart.png";
import { ProfileMenu } from "../comps/ProfileMenu";
import { userRequest } from "../requests/request";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logout } from "../redux/apiCalls";

const Profile = () => {
  const [Items, setItems] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const email = useSelector((state) => state.user.currentUser.email);
  const phone = useSelector((state) => state.user.currentUser.phone);
  const firstname = useSelector((state) => state.user.currentUser.firstname);
  const lastname = useSelector((state) => state.user.currentUser.lastname);
  const username = useSelector((state) => state.user.currentUser.username);
  const id = useSelector((state) => state.user.currentUser._id);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    try {
      localStorage.clear();
      history("/");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await userRequest.get(`/user/find/${id}`);
        setItems(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getItems();
  }, [id]);
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
              <Container className="menu-profile-ext">
                <Container className="d-flex justify-content-between">
                  <h1 className="pad">{t("self")}</h1>
                  <Button
                    variant="warning"
                    onClick={handleClick}
                    className="mb-2 me-3"
                  >
                    Выйти
                  </Button>
                </Container>
                <Container className="d-flex profhandle">
                  <Container>
                    <Container className="box d-flex flex-wrap align-content-between">
                      <Container>
                        <h3>{t("acorder")}</h3>
                        <h5 className="gray">{t("noorder")}</h5>
                      </Container>
                      <Container className="d-flex justify-content-between align-items-baseline">
                        <Link className="no-dec" to="/orders">
                          {t("more")} &gt;{" "}
                        </Link>
                        <Image className="m-0 p-0" src={orderbox}></Image>
                      </Container>
                    </Container>
                    <Container className="box d-flex flex-wrap ">
                      <h3 className="mb-0">{t("self")}</h3>
                      <Container className="d-flex justify-content-between p-0">
                        <Container className="d-flex flex-column p-0 justify-content-between">
                          <Container className="no-pad d-flex flex-column w-50 me-0 ms-0">
                            <p className="black">{Items.username}</p>
                            <p className="black">{Items.phone}</p>
                            <p className="black">{Items.email}</p>
                          </Container>
                          <Link className="no-dec" to="/profileinfo">
                            {t("change")} &gt;{" "}
                          </Link>
                        </Container>
                        <Container className="d-flex justify-content-end align-items-end">
                          <Image className="box-pic" src={bigprof}></Image>
                        </Container>
                      </Container>
                    </Container>
                  </Container>
                  <Container>
                    <Container className="box d-flex flex-wrap align-content-between">
                      <Container>
                        <h3>{t("mycart")}</h3>
                        <h5 className="gray">{t("emptycart")}</h5>
                      </Container>
                      <Container className="d-flex justify-content-between align-items-baseline">
                        <Link className="no-dec" to="/cart">
                          {t("tocart")} &gt;{" "}
                        </Link>
                        <Image className="box-pic" src={profcart}></Image>
                      </Container>
                    </Container>
                    <Container className="box d-flex flex-wrap align-content-between">
                      <Container>
                        <h3>{t("fav")}</h3>
                        <h5 className="gray">{t("noprod")}</h5>
                      </Container>
                      <Container className="no-pad"></Container>
                      <Container className="d-flex justify-content-between align-items-baseline">
                        <a className="no-dec" href="/">
                          {t("gofav")} &gt;{" "}
                        </a>
                        <Image className="box-pic" src={heart}></Image>
                      </Container>
                    </Container>
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

export default Profile;
