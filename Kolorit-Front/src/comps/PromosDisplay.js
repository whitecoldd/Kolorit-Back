import React, { useState, useEffect } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { publicRequest } from "../requests/request";
import AliceCarousel from "react-alice-carousel";
import right from "../assets/right.svg";
import left from "../assets/left.svg";
const PromosDisplay = () => {
  const [items, setitems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`api/article/find?new=new`);
        setitems(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getItems();
  }, []);

  const [myLocalStorageData, setMyLocalStorageData] = useState({});
  useEffect(() => {
    const lng = localStorage.getItem("i18nextLng");
    setMyLocalStorageData(lng);
  }, []);
  const truncate = (input) =>
    input?.length > 150 ? `${input.substring(0, 124)}...` : input;
  return (
    <Container className="d-flex flex-wrap justify-content-between promo-table p-0 mb-3">
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
            <p className="p-4 position-absolute rightbtn1">
              <img src={right} />
            </p>
          );
        }}
        renderNextButton={() => {
          return (
            <p className="p-4 position-absolute leftbtn1">
              <img src={left} />
            </p>
          );
        }}
      >
        {items
          ?.filter((items) => items.lng === myLocalStorageData)
          .slice(0, 4)
          .map((items) => (
            <Container className="promos mb-4 d-flex flex-wrap align-content-start">
              <Link to={`/promotions/${items._id}`} className="real-no-dec">
                <Image fluid className="cut" src={items.img}></Image>
                <Container>
                  <h1 className="pt-1">{items.header}</h1>
                  <p>{truncate(items.text)}</p>
                </Container>
              </Link>
            </Container>
          ))}
      </AliceCarousel>
    </Container>
  );
};

export default PromosDisplay;
