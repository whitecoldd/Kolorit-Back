import React, { useState, useEffect } from "react";
import { Container, Col, Image, Breadcrumb } from "react-bootstrap";
import { Categories } from "../comps/Categories";
import PromosDisplayForCat from "../comps/PromosDisplayForCat";
import { Link } from "react-router-dom";
import CatalogClass from "./CatalogClass";
import { publicRequest } from "../requests/request";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import back from "../assets/back.svg";
export default function Catalog() {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [Items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`/api/cat/find`);
        setItems(res.data);
      } catch {}
    };
    getItems();
  }, [category]);
  const { t } = useTranslation();
  return (
    <>
      <Container>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/">{t("main")}</Breadcrumb.Item>
          <Breadcrumb.Item href="/catalog">
            <mark>{t("head0")}</mark>
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="d-flex align-items-start">
          <button
            className="nobr-bttn pt-2 mt-1 pe-4 d-flex align-items-center"
            onClick={() => navigate(-1)}
          >
            <img src={back} />
            <h1 className="bold ms-4 pt-1">{t("head0")}</h1>
          </button>
        </div>
      </Container>
      <Container className="d-flex flex-wrap justify-content-center no-pad scrolldiv-cat mb-5">
        {Items?.map((item) => (
          <Container key={item._id} className="big-margin mt-2 mb-3 w-21 ">
            <Link className="real-no-dec " to={`/catalog/${item.name}`}>
              <Container className=" h-50p catalog-card d-flex flex-column align-items-center pt-4 mb-3">
                <Image width="80%" height="80%" src={item.img}></Image>
                <h6 className="bold text-uppercase text-center black mt-2">
                  {item.name}
                </h6>
              </Container>
            </Link>
          </Container>
        ))}
      </Container>

      <Container className="">
        <h2 className="bold p-3">Акции и предложения</h2>
        <PromosDisplayForCat></PromosDisplayForCat>
      </Container>
    </>
  );
}
