import React, { useState, useEffect } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { publicRequest } from "../requests/request";

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
    input?.length > 200 ? `${input.substring(0, 154)}...` : input;
  return (
    <Container className="d-flex flex-wrap justify-content-between promo-table p-0 mb-3">
      {items
        ?.filter((items) => items.lng === myLocalStorageData)
        .slice(0, 4)
        .map((items) => (
          <Container className="promos mb-4 d-flex flex-wrap align-content-start  me-3">
            <Link to={`/promotions/${items._id}`} className="real-no-dec">
                <Image fluid className="cut"  src={items.img}></Image>
              <Container>
                <h1 className="pt-1">{items.header}</h1>
                <p>{truncate(items.text)}</p>
              </Container>
            </Link>
          </Container>
        ))}
    </Container>
  );
};

export default PromosDisplay;
