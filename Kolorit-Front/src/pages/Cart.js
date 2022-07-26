import React, { useState, useEffect } from "react";
import {
  Container,
  Breadcrumb,
  Image,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import minus from "../assets/minus.png";
import plus from "../assets/plus.png";
import right from "../assets/right.svg";
import left from "../assets/left.svg";
import trash from "../assets/trash.png";
import { Link, useNavigate } from "react-router-dom";
import ProcessOrder from "./ProcessOrder";
import { useTranslation } from "react-i18next";
import ItemModel from "../comps/ItemModel";
import { publicRequest, userRequest } from "../requests/request";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import { toast, ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { useSelector } from "react-redux";
export default function Cart(props) {
  const [Items, setItems] = useState([]);
  const {
    cartItems,
    onAdd,
    onRemove,
    decreaseQty,
    addToCompare,
    removeFromCompare,
    selectedItems,
    onRemoveFromPage,
  } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();
  if (typeof window !== "undefined") {
    injectStyle();
  }
  const handleDragStart = (e) => e.preventDefault();
  const discounted = useSelector(
    (state) => state.user.currentUser?.discountcard[0]?.discountPercent
  );

  const user = useSelector((state) => state?.user?.currentUser);
  const userDis = useSelector((state) => state.user.currentUser?.discountcard);
  const discount = userDis === undefined ? null : JSON.parse(discounted);
  const totalPrice = !userDis ? cartItems.reduce(
    (salePrice, item) =>
      salePrice + item.qty * item.salePrice,
    0
  ) : cartItems.reduce(
    (salePrice, item) =>
      salePrice + item.qty * (item.salePrice - discount * item.salePrice),
    0
  ) ;
  const delivery = (totalPrice * 1) / 40;
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`/api/items/find?new=new`);
        setItems(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getItems();
  }, []);

  const handleOrder = () => {
    if (cartItems.length > 0) navigate("/process");
    else {
      toast.error("Fill up the cart first");
    }
  };

  const [myLocalStorageData, setMyLocalStorageData] = useState({});
  useEffect(() => {
    const lng = localStorage.getItem("i18nextLng");
    setMyLocalStorageData(lng);
  }, []);
  console.log(discounted);

  const wholeSum = totalPrice + delivery
  return (
    <>
      <Container>
        <Row className="d-flex carthandle">
          <Col sm={8} className="p-0">
            <Container>
              <Breadcrumb>
                <Breadcrumb.Item href="/">{t("main")}</Breadcrumb.Item>
                <Breadcrumb.Item active>
                  <mark>{t("head2")}</mark>
                </Breadcrumb.Item>
              </Breadcrumb>
              <h1>{t("head2")}</h1>
              <Container className="mt-4 cart-cont">
                {cartItems.length === 0 && (
                  <h1 className=" product p-3">{t("emtycart")}</h1>
                )}
                {cartItems.map((item) => {
                  const disc = item.salePrice - discount * item.salePrice;
                  const productQty = userDis ? disc * item.qty : item.salePrice * item.qty;

                  return (
                    <>
                      <Container className="d-flex p-0 m-0">
                        <Container className="p-0 m-0">
                          <Container
                            className="d-flex ps-0 pe-0 cart-card pt-3"
                            key={item.id}
                          >
                            <Container className="cartimgntext p-0 m-0">
                              <Link to={`/catalog/category/${item._id}`}>
                                <div className="img">
                                  <img
                                    width={100}
                                    height={100}
                                    src={item.img}
                                    alt=""
                                  />
                                </div>
                              </Link>
                              <Container className="d-flex p-0 flex-column justify-content-between h-new">
                                <div className="cart-details">
                                  <h3>{item.name}</h3>
                                </div>
                                <div className="cart-details">
                                  <h5 className="gray">
                                    {t("code")} {item.code}
                                  </h5>
                                </div>
                              </Container>
                            </Container>
                            <Container className="d-flex check align-items-baseline p-0 m-0 mt-5">
                              <Container className="count p-0 m-0">
                                <Container className="d-flex scale p-0 m-0">
                                  <button
                                    className="desCart me-2 pb-1"
                                    onClick={() => decreaseQty(item)}
                                  >
                                    <Image src={minus}></Image>
                                  </button>
                                  <Container className="qtyCart d-flex me-2">
                                    <h1 className="qtyCartText">{item.qty}</h1>
                                  </Container>
                                  <button
                                    className="incCart pb-1"
                                    onClick={() => onAdd(item)}
                                  >
                                    <Image src={plus}></Image>
                                  </button>
                                </Container>
                                <Container className="per-one m-0 p-0 pt-2 text-center">
                                  <h5 className="black">
                                    {user ? disc : item.salePrice} mdl/шт.
                                  </h5>
                                </Container>
                              </Container>
                              <Container className="money-n-trash ps-3 pe-0 ">
                                <Container>
                                  <h2 className="total-price d-flex align-items-baseline">
                                    {productQty}{" "}
                                    <span className="orange">MDL</span>
                                  </h2>
                                </Container>
                                <Container className="removeCart ">
                                  <button className="removeCart">
                                    <Image
                                      src={trash}
                                      onClick={() => onRemove(item)}
                                    ></Image>
                                  </button>
                                </Container>
                              </Container>
                            </Container>
                          </Container>
                          <Container className="smth"></Container>
                        </Container>
                      </Container>
                    </>
                  );
                })}
              </Container>
            </Container>
          </Col>
          <Col sm={4} className="p-0">
            <Container className="cart-total p-4 d-flex flex-column align-items-start">
              <h2 className="total-price">
                {t("chose")}{" "}
                <span className="total-price1">{totalPrice.toFixed(1)} MDL</span>
              </h2>
              <h2 className="total-price">
                {t("del")} <span className="total-price1">{delivery.toFixed(1)} MDL</span>
              </h2>
              <h2 className="total-price">
                {t("all")}{" "}
                <span className="total-price1">
                  {wholeSum.toFixed(1)} MDL
                </span>
              </h2>
              <Container className="smth"></Container>
              <Container className="d-flex flex-column align-items-center p-3">
                <Button
                  variant="warning"
                  onClick={handleOrder}
                  className="bttn-cart"
                >
                  {t("order")}
                </Button>

                <input
                  className="mt-4 w-100"
                  id="cartsearch"
                  placeholder="Введите промокод"
                ></input>
              </Container>
            </Container>
          </Col>
        </Row>
      </Container>
      <Container className="d-flex mt-5 mb-3 ps-5 pe-5 justify-content-center items-list-handle">
        <AliceCarousel
          responsive={{
            0: {
              items: 1,
            },
            1024: {
              items: 5,
            },
          }}
          mouseTracking
          renderPrevButton={() => {
            return (
              <p className="p-4 position-absolute rightbtn">
                <img src={right} />
              </p>
            );
          }}
          renderNextButton={() => {
            return (
              <p className="p-4 position-absolute leftbtn">
                <img src={left} />
              </p>
            );
          }}
        >
          {Items?.filter((Items) => Items.lng === myLocalStorageData).map(
            (Items) => {
              return (
                <ItemModel
                  addToCompare={addToCompare}
                  removeFromCompare={removeFromCompare}
                  selectedItems={selectedItems}
                  Items={Items}
                  key={Items._id}
                  onAdd={() => onAdd(Items)}
                  onRemoveFromPage={() => onRemoveFromPage(Items._id)}
                ></ItemModel>
              );
            }
          )}
        </AliceCarousel>
        <ToastContainer />
      </Container>
    </>
  );
}
