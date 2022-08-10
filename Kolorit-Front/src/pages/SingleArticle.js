import React, { useState, useEffect } from "react";
import { publicRequest } from "../requests/request";
import { useTranslation } from "react-i18next";
import {
  Container,
  Row,
  Image,
  Breadcrumb,
  Button,
  Badge,
} from "react-bootstrap";
import Countdown from 'react-countdown'
import { useLocation, Link } from "react-router-dom";
import dayjs from "dayjs";
import ItemModel from '../comps/ItemModel'
const SingleArticle = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [items, setitems] = useState({});
  const [Items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get("/api/article/find/" + id);
        setitems(res.data);
      } catch {}
    };
    getItems();
  }, [id]);
  return (
    <>
      <Container>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/">{t("main")}</Breadcrumb.Item>
          <Breadcrumb.Item href="/promotions">{t("nav6")}</Breadcrumb.Item>
          <Breadcrumb.Item active>
            <mark>{items.header}</mark>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container className="article">
        <h1 className="bold mb-5 pt-3 ps-4">{items.header}</h1>
        <Image fluid className="br-1" src={items.img} width="100%" />
      </Container>
      <Container className=' mt-5 d-flex flex-column align-items-center' >
        <button disabled className="mb-3 bttn-cart">Акция продлится еще <Countdown date={dayjs(items.createdAt)+3000000000 } /></button>
        <p className="black">{items.text}</p>
        <p>{items.productId}</p>
      </Container>
    </>
  );
};

export default SingleArticle;
