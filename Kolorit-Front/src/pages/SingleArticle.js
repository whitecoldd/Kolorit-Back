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
import { useLocation, Link } from "react-router-dom";
import dayjs from 'dayjs';
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
        <h1 className="bold mb-5">{items.header}</h1>
        <h3>{dayjs(items.createdAt).format('YYYY MMMM DD')}</h3>
      </Container>
      <Container>
        <Image className="br-1" src={items.img} width='100%'/>
        <p className="black">{items.text}</p>
      </Container>
    </>
  );
};

export default SingleArticle;
