import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Image,
  Breadcrumb,
  Button,
  Badge,
} from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import right from "../assets/right.svg";
import left from "../assets/left.svg";
import minus from "../assets/minus.png";
import plus from "../assets/plus.png";
import back from "../assets/back.svg";
import checked from "../assets/checked.svg";
import ItemModel from "../comps/ItemModel";
import { publicRequest } from "../requests/request";
import { useTranslation } from "react-i18next";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
const SingleProduct = ({
  decreaseQty,
  onAdd,
  onRemoveFromPage,
  addToCompare,
  removeFromCompare,
  selectedItems,
  prevPath,
}) => {
  const handleDragStart = (e) => e.preventDefault();

  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [items, setitems] = useState({});
  const [Items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get("/api/items/find/" + id);
        setitems(res.data);
      } catch {}
    };
    getItems();
  }, [id]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get("/api/items/find");
        setItems(res.data);
      } catch {}
    };
    getItems();
  }, []);
  const [first, setfirst] = useState(0);
  const { t } = useTranslation();

  const [myLocalStorageData, setMyLocalStorageData] = useState({});
  useEffect(() => {
    const lng = localStorage.getItem("i18nextLng");
    setMyLocalStorageData(lng);
  }, []);
  return (
    <>
      <Container className="mt-3">
        <Breadcrumb>
          <Breadcrumb.Item href="/">{t("main")}</Breadcrumb.Item>
          <Breadcrumb.Item active>
            <mark>{items.name}</mark>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container className="sprodhandle">
        <>
          <Container className="d-flex align-items-center">
            <Link to={{ prevPath }}>
              <img src={back} />
            </Link>
            <h1 className="ms-2">{items.name}</h1>
          </Container>
          <Container className="d-flex sprodhandle1 mt-4">
            <Container
              id="flex1"
              key={items._id}
              className="single-prod-img me-4 mb-4 d-flex align-items-stretch justify-content-center"
            >
              <Image fluid src={items.img}></Image>
            </Container>
            <Container
              id="flex3"
              className="sell-board ms-3 mb-4 single-prod-img d-flex pb-5 pt-5 sprodhandle"
            >
              <Container>
                <h5 className="gray">
                  {t("code")} {items.code}
                </h5> 
                <p>
                  {t("cat")}{" "}
                  <span className="orange fatund">{items.category}</span>
                </p>
                <p className="d-flex align-items-center">
                  <img src={checked} className="me-2" />{" "}
                  {items?.inStock?.toString()}
                </p>
                <Container className="">
                  <p className="smth d-flex justify-content-between flex-nowrap">
                    {items.char1}
                    <span className="orange">{items.char1a}</span>
                  </p>
                  <p className="smth d-flex justify-content-between flex-nowrap">
                    {items.char2}
                    <span className="orange">{items.char2a}</span>
                  </p>
                  <p className="smth d-flex justify-content-between flex-nowrap">
                    {items.char3}
                    <span className="orange">{items.char3a}</span>
                  </p>
                  <p className="d-flex justify-content-between flex-nowrap">
                    {items.char4}
                    <span className="orange">{items.char4a}</span>
                  </p>
                </Container>
              </Container>
              <Container className="buy-box pb-3">
                <Container className="d-flex flex-column align-items-start pt-4">
                  <del className="gray">
                    {items.price} {items.currency}
                  </del>

                  <span className="orange position-relative">
                    <span className="big bold orange">{items.salePrice}</span>{" "}
                    {items.currency}{" "}
                    <Badge className="new-pos" bg="secondary">
                      Экономия{" "}
                      <span className="orange">
                        {items.price - items.salePrice} {items.currency}
                      </span>
                    </Badge>
                  </span>
                </Container>
                <Container className="buy-box-btns smth p-2 pb-5">
                  <Button
                    variant="outline-warning"
                    onClick={() => {
                      onAdd(items);
                      setfirst(first + 1);
                    }}
                  >
                    <span>{t("addtocart")}</span>
                  </Button>
                  <Container className="d-flex scale">
                    <button
                      className="desCart me-2 mb-1"
                      onClick={() => {
                        decreaseQty(items);
                        setfirst(first - 1);
                      }}
                    >
                      <Image src={minus}></Image>
                    </button>
                    <Container className="qtyCart d-flex me-2 ps-3 pe-2">
                      <h1 className="qtyCartText">{first}</h1>
                    </Container>
                    <button
                      className="incCart mb-1"
                      onClick={() => {
                        onAdd(items);
                        setfirst(first + 1);
                      }}
                    >
                      <Image src={plus}></Image>
                    </button>
                  </Container>
                </Container>
                <div className="d-flex justify-content-center pt-3">
                  <p>
                    {t("card1")}: {items.guarantee}
                  </p>
                </div>
                <Container className="d-flex align-items-center justify-content-around">
                  <span className="small pe-3">
                    {" "}
                    {items.salePrice / 10} {items.currency} / {t("amonth")}
                  </span>
                  {/* <Link to="/process"> */}
                  <Button className="p-2 ps-3 pe-3" variant="secondary">
                    {t("buycred")}
                  </Button>
                  {/* </Link> */}
                </Container>
              </Container>
            </Container>
          </Container>
          <Container className="d-flex sprodhandle">
            <Container
              id="flex8"
              className="single-prod-img p-3 me-3 mt-3 mb-4 w-auto"
            >
              <h2 className="ps-3 bold">{t("chars")}</h2>
              <Container className="sell-board ">
                <p className="smth d-flex justify-content-between">
                  {items.char1}
                  <span className="orange">{items.char1a}</span>
                </p>
                <p className="smth d-flex justify-content-between">
                  {items.char2}
                  <span className="orange">{items.char2a}</span>
                </p>
                <p className="smth d-flex justify-content-between">
                  {items.char3}
                  <span className="orange">{items.char3a}</span>
                </p>
                <p className=" d-flex justify-content-between flex-nowrap flex-row smth">
                  {items.char4}
                  <span className="orange">{items.char4a}</span>
                </p>
                <p className="smth d-flex justify-content-between">
                  {items.char5}:<span className="orange">{items.char5a}</span>
                </p>
                <p className=" d-flex justify-content-between flex-nowrap flex-row smth">
                  {items.char6}:<span className="orange">{items.char6a}</span>
                </p>
                <p className=" d-flex justify-content-between flex-nowrap flex-row">
                  {t("dims")}:<span className="orange ">{items.dimensions}</span>
                </p>
              </Container>
            </Container>
            <Container
              id="flex7"
              className="single-prod-img pt-3 pe-1 ps-1 sell-board mt-3 mb-4 ms-3"
            >
              <h2 className="ps-4 bold">{t("desc")}</h2>
              <p className="p-4 light">{items.description}</p>
            </Container>
          </Container>
          <Container>
            <Container className="single-prod-img p-2 sell-board mt-3">
              <h2 className="ps-4 bold">{t("additinfo")}</h2>
              <Container className="d-flex sprodhandle pt-4 ps-4">
                <Container id="flex3">
                  <h6 className="bold">{t("producer")} </h6>
                  <p className="gray">
                    {" "}
                    {items.brandCountry} - {t("brand")}
                  </p>
                  <p className="gray">
                    {" "}
                    {items.originalCountry} - {t("prodcount")}
                  </p>
                </Container>
                <Container id="flex2">
                  <h6 className="bold">{t("complect")} </h6>
                  <ul className="">
                    {items?.complect?.map((comp) => (
                      <li className="gray">{comp}</li>
                    ))}
                  </ul>
                </Container>
                <Container id="flex2">
                  <h6 className="bold">{t("info")}</h6>
                  <Container className="d-flex p-0">
                    <div className="pe-2">
                      <p className="gray size-adj">
                        {t("piece")} <span>{items.singleProd}</span>
                      </p>
                      <p className="gray size-adj">
                        {t("wt")} : <span>{items.weight}</span>{" "}
                      </p>
                      <p className="gray size-adj">
                        {t("lt")} : <span>{items.length}</span>{" "}
                      </p>
                    </div>
                    <div>
                      <p className="gray size-adj">
                        {t("wdt")} : <span>{items.width}</span>{" "}
                      </p>
                      <p className="gray size-adj">
                        {t("ht")} : <span>{items.height}</span>{" "}
                      </p>
                    </div>
                  </Container>
                </Container>
              </Container>
            </Container>
          </Container>
        </>
      </Container>
      <Container fluid className="bg-gray mt-5 pb-5">
        <Container>
          <b className="pt-4 pb-4 mt-2 ">
            <h1 className="bold pt-4">С этим покупают</h1>
          </b>
          <Container className="d-flex mt-2 items-list-handle">
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
                      key={Items.id}
                      onAdd={() => onAdd(Items)}
                      onRemoveFromPage={() => onRemoveFromPage(Items._id)}
                    ></ItemModel>
                  );
                }
              )}
            </AliceCarousel>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default SingleProduct;
