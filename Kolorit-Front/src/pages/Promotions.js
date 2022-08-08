import React, { useState, useEffect } from "react";
import { Container, Col, Image, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PromosDisplay from "../comps/PromosDisplay";
import { publicRequest } from "../requests/request";
export default function Promotions() {
  const { t } = useTranslation();
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
    <>
      <Container>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/">{t("main")}</Breadcrumb.Item>
          <Breadcrumb.Item active>
            <mark>{t("nav6")}</mark>
          </Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="bold mb-5">{t("nav6")}</h1>
      </Container>
      <Container>
        <Container className="d-flex flex-wrap justify-content-between promo-table p-0 mb-3">
          {items
            ?.filter((items) => items.lng === myLocalStorageData)
            .map((items) => (
              <Container className="promos mb-4 d-flex flex-wrap align-content-start  me-3">
                <Link to={`/promotions/${items._id}`} className="real-no-dec">
                  <Image fluid src={items.img}></Image>
                  <Container>
                    <h1 className="pt-1">{items.header}</h1>
                    <p>{truncate(items.text)}</p>
                  </Container>
                </Link>
              </Container>
            ))}
        </Container>
      </Container>
    </>
  );
}
