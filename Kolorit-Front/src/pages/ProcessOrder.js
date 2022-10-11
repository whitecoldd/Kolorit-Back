import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  ButtonGroup,
  ToggleButton,
  Button,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import phonep from "../assets/phone.png";
import address from "../assets/address.png";
import clock from "../assets/clock.png";
import { useSelector } from "react-redux";
import { userRequest, publicRequest } from "../requests/request";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import CardsItem from "../comps/CardsItem";
import CardsItemVert from "../comps/CardsItemVert";
const ProcessOrder = ({ cartItems }) => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({});
  const [shop, setShop] = useState("");
  const [state, setState] = useState(0);
  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChange1 = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setShop(e.target.value);
    console.log(e.target.value);
    console.log(shop);
    return shop;
  };
  const handleClutch = (e) => {
    e.preventDefault();
    setState(() => state + 1);
    console.log(state);
  };
  if (typeof window !== "undefined") {
    injectStyle();
  }
  const admin = useSelector((state) => state.user?.currentUser);
  const userName = useSelector((state) => state.user?.currentUser?.username);
  const phone = useSelector((state) => state.user?.currentUser?.phone);
  const email = useSelector((state) => state.user?.currentUser?.email);
  const productId = cartItems;
  const quantity = cartItems.length;
  const { t } = useTranslation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userRequest.post(`/api/order/`, order);
      console.log(res.data);
      history("/success");
    } catch (e) {
      console.log(e);
      toast.error(t("err"));
    }
  };
  const [select, setSelect] = useState("---");
  const [text, setText] = useState();
  const [Items, setItems] = useState([]);
  const [newItems, setNewItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`/api/contact/find`);
        setItems(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getItems();
  }, []);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`/api/contact/find/${shop}`);
        setNewItems(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getItems();
  }, [shop]);

  const [filtered, setFiltered] = useState({});

  // const handleFilter = (e) => {
  //   const value = e.target.value;
  //   setFilter({
  //     ...filter,
  //     [e.target.name]: value,
  //   });
  // };

  const [myLocalStorageData, setMyLocalStorageData] = useState({});
  useEffect(() => {
    const lng = localStorage.getItem("i18nextLng");
    setMyLocalStorageData(lng);
  }, []);
  const handleSelect = (event) => {
    setSelect(event.target.value);
    console.log(select);
    if (event.target.value === "pick-up") {
      setText(<></>);
      return text;
    } else if (event.target.value === "delivery") {
      setText(<></>);
      return text;
    } else if (event.target.value === "---") {
      setText("");
      return text;
    }
  };
  const order = {
    ...inputs,
    userName: userName || inputs.userFName,
    phone: phone || inputs.phone,
    email: email || inputs.email,
    address: newItems.address || inputs.address,
    productId: productId,
    quantity: quantity,
    sum: productId?.reduce(
      (salePrice, item) => salePrice + item.qty * item.salePrice,
      0
    ),
  };
  const [Del, setDel] = useState(true);
  const setOn = (e) => {
    e.preventDefault();
    setDel(false);
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(e.target.value)
  };
  const setOff = (e) => {
    e.preventDefault();
    setDel(true);
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(e.target.value)
  };
  const [color, setColor] = useState(true);
  const handleColor = (e) => {
    setColor(!color);
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="d-flex">
      <Container className="mar-ins">
        <Form>
          <Container className="d-flex align-items-baseline p-0">
            <h1>{t("procorder")}</h1>{" "}
            <span className="ps-2">
              {cartItems.length} {t("prod")}
            </span>
          </Container>

          <Container className="d-flex align-items-center position-relative">
            <button disabled className="br-50-1 position-absolute">
              1
            </button>
            <h2 className=" ms-3">{t("userdet")}</h2>
          </Container>
          <Container className="b-left">
            <Container className="d-flex justify-content-center forming w-30 m-0">
              <label className={color ? "me-2 gold" : "me-2 black"} name="buyerType">
                {t("law")}
              </label>

              <Form.Check
                type="switch"
                onClick={handleColor}
                name="buyerType"
                id="custom-switch"
                label=""
              />
              <label className={color ? "ms-1 black" : "ms-1 gold"} name="buyerType">
                {t("phys")}
              </label>
            </Container>

            <Form.Control type="hidden" name="userId" value={admin?._id} />
            <Form.Control
              type="hidden"
              name="productId"
              value={[cartItems?.id]}
            />
            <Form.Control
              type="hidden"
              name="quantity"
              value={cartItems?.length}
            />
            {admin ? (
              ""
            ) : (
              <>
                <h4 className="forming1 mt-3 mb-4 black bold d-flex flex-nowrap">
                  {" "}
                  {t("isthere")}{" "}
                  <Link to="/login" className="orange bold">
                    {t("head3/2")}
                  </Link>{" "}
                  <ArrowForwardIosIcon />{" "}
                </h4>
                <Container className="form-control-process">
                  <Form.Group
                    className="mb-3 pe-3 "
                    id="formprocess"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="userFName"
                      placeholder={t("name")}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 pe-3 "
                    id="formprocess"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="Телефон"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 pe-3 "
                    id="formprocess"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="E-mail (необязательно)"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Container>
              </>
            )}
          </Container>
          <Container className="p-0 m-0 position-relative">
            <button disabled className="br-50 position-absolute mt-1">
              2
            </button>
            <h2 className=" ms-4">{t("deltype")}</h2>
            <Container className="b-left">
              {/* <Form.Select
                name="delType"
                value={select}
                aria-label="Default select example"
                onChange={(e) => {
                  handleSelect(e);
                  handleChange(e);
                }}
              >
                <option>---</option>
                <option value="pick-up">{t("pickup")}</option>
                <option value="delivery">{t("del")}</option>
              </Form.Select> */}
              <button className="bttn-empty me-4" name="delType" value="pick-up" onClick={setOn}>
                {t("pickup")}{" "}
              </button>
              <button className="bttn-empty" name="delType" value="delivery" onClick={setOff}>
                {t("del")}{" "}
              </button>
              {!Del ? (
                <>
                  <Container
                    className="content-cont d-flex mt-5"
                    style={{ paddingRight: "0px" }}
                  >
                    <Image fluid width={350} src={newItems.img}></Image>
                    <Container className="p-4">
                      <div className="d-flex align-items-baseline justify-content-between">
                        <h1 className="p-3">{newItems.name}</h1>
                        <select
                          name="address"
                          className="classic mt-3"
                          onChange={handleChange1}
                        >
                          {Items.filter(
                            (Items) => Items.lng === myLocalStorageData
                          ).map((item) => (
                            <option value={item._id}>{item.name}</option>
                          ))}
                        </select>
                      </div>
                      <Container className="d-flex align-items-start">
                        <Image width="auto" height="auto" src={address}></Image>
                        <Container className="d-flex flex-nowrap justify-content-between mb-3">
                          <p>{newItems.address}</p>
                          <a href="#map" type="button" className="bttn-map">
                            {t("map-btn")}
                          </a>
                        </Container>
                      </Container>
                      <Container className="d-flex align-items-start">
                        <Image width="auto" height="auto" src={clock}></Image>
                        <Container className="d-flex flex-column align-items-start">
                          <h3>{t("nav7")}</h3>
                          <Container className="d-flex align-items-start m-0">
                            <Container className="text-center linevert">
                              <p>{t("days")}</p>
                              <p>{newItems.workHours} </p>
                            </Container>
                            <Container className="text-center">
                              <p>{t("day")}</p>
                              <p> {newItems.workHoursH} </p>
                            </Container>
                          </Container>
                        </Container>
                      </Container>
                    </Container>
                  </Container>
                </>
              ) : (
                <>
                  <Form.Group
                    className="mb-3 pe-3 mt-5"
                    id="formprocess"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Адрес"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </>
              )}
              <Container className="mt-4">{text}</Container>
            </Container>
          </Container>

          <Container className="p-0 m-0 position-relative">
            <button disabled className="br-50 position-absolute mt-2">
              3
            </button>
            <h2 className="  ms-4 mt-2">{t("paytype")}</h2>
            <Container className="b-left mb-4">
              <button name="payment" value="transaction" className="bttn-empty me-4" onClick={handleChange}>
                {t("trans")}{" "}
              </button>
              <button name="payment" value="online-payment" className="bttn-empty me-4" onClick={handleChange}>
                {t("online")}{" "}
              </button>
              <button name="payment" value="credit" className="bttn-empty me-4" onClick={handleChange}>
                {t("cred")}{" "}
              </button>
              <button name="payment" value="cash" className="bttn-empty" onClick={handleChange}>
                {t("cash")}{" "}
              </button>
            </Container>
            <button onClick={handleSubmit} className="bttn-cart mb-3">
              {t("sendit")}
            </button>
          </Container>
          <ToastContainer />
        </Form>
        <p className="black">{t("conf")}</p>
      </Container>

      {/* <CardsItemVert /> */}
    </div>
  );
};

export default ProcessOrder;
