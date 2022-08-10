import React, { useEffect, useState } from "react";
import {
  Nav,
  Container,
  Image,
  Button,
  Row,
  Col,
  Tab,
  Badge,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { MenuItems } from "../comps/MenuItems";
import MenuItemsDisplay from "../comps/MenuItemsDisplay";
import slider from "../assets/slider.png";
import right from "../assets/right.svg";
import left from "../assets/left.svg";
import sale from "../assets/salesprod.png";
import buy from "../assets/tocart.png";
import tick1 from "../assets/tick1.png";
import tick2 from "../assets/tick2.png";
import tick3 from "../assets/tick3.png";
import tick4 from "../assets/tick4.png";
import { Link } from "react-router-dom";
import ItemModel from "../comps/ItemModel";
import ProductDisplay from "../comps/ProductDisplay";
import Marquee from "react-fast-marquee";
import CardsItem from "../comps/CardsItem";
import Countdown from "react-countdown";
import PromosDisplay from "../comps/PromosDisplay";
import axios from "axios";
import { publicRequest, userRequest } from "../requests/request";
import AppPagination from "../comps/AppPagination";
import Slider from "../comps/Slider";
import ItemOfDay from "../comps/ItemOfDay";
import { useTranslation } from "react-i18next";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
export default function Home(props) {
  const { t } = useTranslation();
  const {
    onAdd,
    onRemoveFromPage,
    addToCompare,
    removeFromCompare,
    selectedItems,
    cartItems,
  } = props;
  const location = useLocation();
  const [Items, setItems] = useState([]);
  const [Brands, setBrands] = useState([]);
  // const [prods, setProds] = useState([])
  console.log(location);

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
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`/api/brandsIcon/find`);
        setBrands(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getItems();
  }, []);
  const handleDragStart = (e) => e.preventDefault();
  const [myLocalStorageData, setMyLocalStorageData] = useState({});
  useEffect(() => {
    const lng = localStorage.getItem("i18nextLng");
    setMyLocalStorageData(lng);
  }, []);
  return (
    <>
      <Container className="d-flex">
        <Container className="menu-space mt-3 p-0">
          <MenuItemsDisplay></MenuItemsDisplay>
        </Container>
         <Container className="me-1 mt-3 carousel-mine">
          <Slider />
        </Container>
      </Container>
      <Container className="mt-5 catsnsale">
        <Container className="d-flex flex-wrap justify-content-between prod-cont">
          <ProductDisplay></ProductDisplay>
        </Container>
        <Container className="d-flex flex-wrap align-content-between justify-content-center sales-prod p-3 w-auto mb-4">
          {Items?.filter((Items) => Items.lng === myLocalStorageData)
            .slice(0, 1)
            .map((Items) => (
              <ItemOfDay
                addToCompare={addToCompare}
                removeFromCompare={removeFromCompare}
                selectedItems={selectedItems}
                Items={Items}
                key={Items.id}
                onAdd={() => onAdd(Items)}
                onRemoveFromPage={() => onRemoveFromPage(Items._id)}
              ></ItemOfDay>
            ))}
        </Container>
      </Container>
      <Container
        fluid
        className="d-flex flex-nowrap flex-column sales-prod-carousel"
      >
        <Container className="d-flex flex-wrap justify-content-start">
          <b className="pt-4 pb-4">
            <h1>{t("car1")}</h1>
          </b>
          <Container className="d-flex flex-row mt-2 justify-content-center items-list-handle">
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
              {Items
              //?.filter((Items) => Items.lng === myLocalStorageData)
                .filter((item) => item.promo.includes("Скидка"))
                ?.map((Items) => (
                  <ItemModel
                    onDragStart={handleDragStart}
                    addToCompare={addToCompare}
                    removeFromCompare={removeFromCompare}
                    selectedItems={selectedItems}
                    Items={Items}
                    key={Items.id}
                    onAdd={() => onAdd(Items)}
                    onRemoveFromPage={() => onRemoveFromPage(Items._id)}
                  ></ItemModel>
                ))}
            </AliceCarousel>
          </Container>
          {/* <Container className='d-flex justify-content-center'>
              <AppPagination Items={Items} setItems={(item) => setItems(item)} ></AppPagination>
            </Container> */}
        </Container>
        <Container className="d-flex flex-wrap justify-content-center mt-5 mb-3">
          <Link type="button" to="/catalog" className="bttn-more">
            {t("more1")}
          </Link>
        </Container>
      </Container>
      <Container>
        <h1 className="pt-4 pb-4">{t("car2")}</h1>
        <Container>
          <PromosDisplay></PromosDisplay>
          <Container className="d-flex flex-wrap justify-content-center mt-5 mb-3">
            <Link type='button' to='/promotions' className="bttn-more">
              {t("more2")}
            </Link>
          </Container>
        </Container>
      </Container>
      <Container
        fluid
        className="d-flex flex-nowrap flex-column sales-prod-carousel"
      >
        <Container className="d-flex flex-wrap justify-content-start">
          <b className="pt-4 pb-4">
            <h1>{t("car3")}</h1>
          </b>
          <Container className="d-flex mt-2 justify-content-center items-list-handle">
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
              {Items
              //.filter((Items) => Items.lng === myLocalStorageData)
              .map(
                (Items) => (
                  <ItemModel
                    addToCompare={addToCompare}
                    removeFromCompare={removeFromCompare}
                    selectedItems={selectedItems}
                    Items={Items}
                    key={Items.id}
                    onAdd={() => onAdd(Items)}
                    onRemoveFromPage={() => onRemoveFromPage(Items._id)}
                  ></ItemModel>
                )
              )}
            </AliceCarousel>
          </Container>
          {/* <Container className='d-flex justify-content-center'>
              <AppPagination Items={Items} setItems={(item) => setItems(item)}  ></AppPagination>
            </Container> */}
        </Container>
        <Container className="d-flex flex-wrap justify-content-center mt-5 mb-3">
          <Link type="button" to="/catalog" className="bttn-more">
            {t("more1")}
          </Link>
        </Container>
      </Container>
      <CardsItem></CardsItem>
      <Container
        fluid
        className="d-flex flex-nowrap flex-column sales-prod-carousel"
        style={{ backgroundColor: "#FFF" }}
      >
        <Container className="d-flex flex-wrap justify-content-start">
          <b className="pt-5 pb-2">
            <h1>{t("car4")}</h1>
          </b>
          <Container className="d-flex mt-2 justify-content-center items-list-handle">
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
              autoPlay
              autoPlayInterval={3000}
              infinite
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
              {Items
              //?.filter((Items) => Items.lng === myLocalStorageData)
              .map(
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
          {/* <Container className='d-flex justify-content-center'>
              <AppPagination Items={Items} setItems={(Items) => setItems(Items)} ></AppPagination>
            </Container> */}
        </Container>
        <Container className="d-flex flex-wrap justify-content-center mt-5 mb-3">
          <Link type="button" to="/catalog" className="bttn-more">
            {t("more1")}
          </Link>
        </Container>
      </Container>
      <Container fluid>
        <Marquee className="track mt-4 mb-5">
          {Brands.map((Brands) => (
            <Image width="80%" height="80%" src={Brands.img}></Image>
          ))}
        </Marquee>
      </Container>
    </>
  );
}
