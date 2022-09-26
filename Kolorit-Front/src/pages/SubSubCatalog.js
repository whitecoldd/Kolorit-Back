import React, { useState, useEffect } from "react";
import { Container, Col, Image, Breadcrumb } from "react-bootstrap";
import { Categories } from "../comps/Categories";
import PromosDisplayForCat from "../comps/PromosDisplayForCat";
import { Link } from "react-router-dom";
import CatalogClass from "./CatalogClass";
import { publicRequest } from "../requests/request";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
export default function Catalog() {
  const location = useLocation();
  const category = location.pathname.split("/")[3];
  const [Items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(
          category
            ? `/api/subsubcat/find?subcat=${category}`
            : `/api/subsubcat/find`
        );
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
            {t("foot4")}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <mark>{decodeURIComponent(category)}</mark>
          </Breadcrumb.Item>
        </Breadcrumb>

        <h1 className="bold mb-5">{decodeURIComponent(category)}</h1>
      </Container>
      <Container className="d-flex flex-wrap justify-content-center scrolldiv-cat no-pad mb-5">
        {Items?.map((item) => (
          <Container key={item._id} className="big-margin mt-2 mb-3 w-21 ">
            <Link
              className="real-no-dec "
              to={`/catalog/title/${item.subcat}/${item.name}`}
            >
              <Container className=" h-50p catalog-card d-flex flex-column align-items-center pt-4 mb-3">
                <Image width="80%" height="80%" src={item.img}></Image>
                <h6 className="bold text-uppercase text-center black mt-2">{item.name}</h6>
              </Container>
            </Link>
          </Container>
        ))}
      </Container>

      {/* <Container>
        <h2 className="bold pt-4 pb-4">Акции и предложения</h2>
        <PromosDisplayForCat></PromosDisplayForCat>
      </Container>  */}
    </>
  );
}
