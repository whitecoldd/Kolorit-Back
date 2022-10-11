import React, { useState, useEffect } from "react";
import { Container, Image, Breadcrumb } from "react-bootstrap";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NewPagination from "../comps/NewPagination";
import { publicRequest } from "../requests/request";
import { cyan } from "@mui/material/colors";
export default function Promotions() {
  const { t } = useTranslation();
  const [items, setitems] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [newerItems, setNewerItems] = useState([]);
  const [myLocalStorageData, setMyLocalStorageData] = useState({});
  const [cats, setCats] = useState([
    { id: 0, name: t("nav6") },
    { id: 1, name: t("articles") },
    { id: 2, name: t("foot25") },
    { id: 3, name: "Предложения" },
  ]);
  const [tabIndex, setTabIndex] = useState([]);
  const handleChange = (e) => {
    if (e.target.index) {
      setTabIndex([...tabIndex, e.id]);
    } else {
      setTabIndex(tabIndex.filter((id) => id !== e.id));
    }
  };
  useEffect(() => {
    const lng = localStorage.getItem("i18nextLng");
    setMyLocalStorageData(lng);
  }, []);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`api/article/find?new=new`);
        setitems(res.data);
        setNewItems(items.filter((items) => items.lng === myLocalStorageData));
        setNewerItems(
          newItems.filter((item) =>
            cats.some((c) => [item.cat].flat().includes(c.name))
          )
        );
      } catch (e) {
        console.log(e);
      }
    };
    getItems();
  }, [items, newItems]);

  const truncate = (input) =>
    input?.length > 200 ? `${input.substring(0, 154)}...` : input;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(100);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = newerItems.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //console.log(tabIndex);
  const [tab, setTab] = useState(0);
  return (
    <>
      <Container>
        <Breadcrumb className="mt-3 mb-5">
          <Breadcrumb.Item href="/">{t("main")}</Breadcrumb.Item>
          <Breadcrumb.Item active>
            <mark>{t("nav6")}</mark>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container>
        <Tabs>
          <TabList>
            {cats.map((cat, i) => (
              <Tab key={i}>{cat.name}</Tab>
            ))}
          </TabList>
          <hr />
          <h1 className="bold mb-5">{t("nav6")}</h1>
          {cats.map((cat, i) => (
            <TabPanel>
              <Container className="d-flex flex-wrap justify-content-between promo-table p-0 mb-3">
                {currentPosts.map((items) => (
                  <Container
                    key={items._id}
                    className="promos1 mb-4 d-flex flex-wrap align-content-start  me-3"
                  >
                    <Link
                      to={`/promotions/${items._id}`}
                      className="real-no-dec"
                    >
                      <Image fluid className="cut" src={items.img}></Image>
                      <Container>
                        <h1 className="pt-1">{items.header}</h1>
                        <p>{truncate(items.text)}</p>
                      </Container>
                    </Link>
                  </Container>
                ))}
              </Container>
            </TabPanel>
          ))}
        </Tabs>

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
