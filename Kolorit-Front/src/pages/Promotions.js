import React, { useState, useEffect } from "react";
import { Container, Col, Image, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NewPagination from "../comps/NewPagination";
import { publicRequest } from "../requests/request";
export default function Promotions() {
  const { t } = useTranslation();
  const [items, setitems] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [myLocalStorageData, setMyLocalStorageData] = useState({});
  useEffect(() => {
    const lng = localStorage.getItem("i18nextLng");
    setMyLocalStorageData(lng);
  }, []);
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
    setNewItems(items.filter((items) => items.lng === myLocalStorageData));
  }, [items]);

  const truncate = (input) =>
    input?.length > 200 ? `${input.substring(0, 154)}...` : input;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = newItems.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
          {currentPosts.map((items) => (
            <Container className="promos1 mb-4 d-flex flex-wrap align-content-start  me-3">
              <Link to={`/promotions/${items._id}`} className="real-no-dec">
                <Image fluid className="cut" src={items.img}></Image>
                <Container>
                  <h1 className="pt-1">{items.header}</h1>
                  <p>{truncate(items.text)}</p>
                </Container>
              </Link>
            </Container>
          ))}
        </Container>
        <Container className="d-flex justify-content-center">
          <NewPagination
            postsPerPage={postsPerPage}
            totalPosts={newItems.length}
            paginate={paginate}
          />
        </Container>
      </Container>
    </>
  );
}
