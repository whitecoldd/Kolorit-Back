import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  ButtonGroup,
  ToggleButton,
  Button,
  Image,
} from "react-bootstrap";
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
const ProcessOrder = ({ cartItems }) => {
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
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
      toast(t("ordpend"));
    } catch (e) {
      console.log(e);
    }
  };
  const [select, setSelect] = useState("---");
  const [text, setText] = useState();
  const [Items, setItems] = useState([]);

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
    if (select === "delivery") {
      setText(
        <>
          <select
            name="address"
            className="classic mt-3"
            onChange={handleChange}
          >
            {Items.filter((Items) => Items.lng === myLocalStorageData).map(
              (item) => (
                <option value={item.address}>
                  {item.name}, {item.address}
                </option>
              )
            )}
          </select>
        </>
      );
      return text;
    } else if (select === "pick-up") {
      setText(
        <>
          <Form.Group
            className="mb-3 pe-3 "
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
      );
      return text;
    } else if (select === "---") {
      setText("");
      return text;
    }
  };
  const order = {
    ...inputs,
    userName: userName || inputs.userFName,
    phone: phone || inputs.phone,
    email: email || inputs.email,
    //address: Items[0].address || inputs.address,
    productId: productId,
    quantity: quantity,
    sum: productId?.reduce(
      (salePrice, item) => salePrice + item.qty * item.salePrice,
      0
    ),
  };
  return (
    <>
      <Container className="mar-ins">
        <Form>
          <Container className="d-flex align-items-baseline p-0">
            <h1>{t("procorder")}</h1> {cartItems.length} {t("prod")}
          </Container>

          <Container className="d-flex align-items-center position-relative">
            <Button variant="warning" className="br-50 position-absolute">
              1
            </Button>
            <h2 className=" ms-3">{t("userdet")}</h2>
          </Container>
          <Container className="b-left">
            <Container className="d-flex justify-content-start forming w-30 m-0">
              <label className="me-2">{t("law")}</label>
              <Form.Check type="switch" id="custom-switch" label={t("phys")} />
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
                    {t("enter")}
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
                      placeholder="Имя пользователя"
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
            <Button variant="warning" className="br-50 position-absolute mt-1">
              2
            </Button>
            <h2 className=" ms-4">{t("deltype")}</h2>
            <Container className="b-left">
              <Form.Select
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
              </Form.Select>
              <Container className="mt-4">{text}</Container>
            </Container>
          </Container>

          <Container className="p-0 m-0 position-relative">
            <Button variant="warning" className="br-50 position-absolute mt-2">
              3
            </Button>
            <h2 className="  ms-4 mt-2">{t("paytype")}</h2>
            <Container className="b-left">
              <Form.Select
                name="payment"
                className="mb-3"
                aria-label="Default select example"
                onChange={handleChange}
              >
                <option value="transaction">{t("trans")}</option>
                <option value="online-payment">{t("online")}</option>
                <option value="credit">{t("cred")}</option>
                <option value="cash">{t("cash")}</option>
              </Form.Select>
            </Container>
            <button onClick={handleSubmit} className="bttn-cart mb-3">
              {t("sendit")}
            </button>
          </Container>
          <ToastContainer />
        </Form>
        <p className="black">{t("conf")}</p>
      </Container>
    </>
  );
};

export default ProcessOrder;
