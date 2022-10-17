import React, { useState, useEffect, useCallback } from "react";
import {
  Breadcrumb,
  Container,
  Button,
  Col,
  Nav,
  Navbar,
  Image,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import type1 from "../assets/type1.png";
import type1g from "../assets/typ1g.svg";
import type2 from "../assets/type2.png";
import type2g from "../assets/typ2g.svg";
import back from "../assets/back.svg";
import CatalogMenu from "../comps/CatalogMenu";
import ItemModelForCat from "../comps/ItemModelForCat";
import ItemsModelUnfold from "../comps/ItemsModelUnfold";
import AppPagination from "../comps/AppPagination";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import NewPagination from "../comps/NewPagination";
import { publicRequest } from "../requests/request";
import { useTranslation } from "react-i18next";
const checklist = [
  { inStock: "В наличии" },
  { inStock: "Под заказ : сегодня" },
  { inStock: "Под заказ : завтра" },
  { inStock: "Под заказ : позже" },
];
const CatalogClass = ({
  onAdd,
  onRemoveFromPage,
  removeFromCompare,
  addToCompare,
  selectedItems,
}) => {
  const items = [...Array(90).keys()];
  const [Items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [sorting, setSorting] = useState();
  const [sortingS, setSSorting] = useState();
  const [sortingP, setPSorting] = useState();
  const [state, setState] = useState(false);
  const [sale, setSale] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const [Width, setWidth] = useState(true);
  const category = location.pathname.split("/")[4];
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(
          category ? `/api/items/find?category=${category}` : `/api/items/find`
        );
        setItems(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getItems();
  }, [category]);

  const navigate = useNavigate();

  const [value, setValue] = useState([0, 40000]);
  const [brands, setBrands] = useState([]);
  const [newBrands, setNewBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`/api/brand/find`);
        setBrands(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getItems();
  }, []);
  const handleChange = (e) => {
    if (e.target.checked) {
      setNewBrands([...newBrands, e.target.value]);
    } else {
      setNewBrands(newBrands.filter((id) => id !== e.target.value));
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
  };
  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };
  const [myLocalStorageData, setMyLocalStorageData] = useState({});
  useEffect(() => {
    const lng = localStorage.getItem("i18nextLng");
    setMyLocalStorageData(lng);
  }, []);
  const [Check, setCheck] = useState([]);
  const handleCheck = (e) => {
    if (e.target.checked) {
      setCheck([...Check, e.target.value]);
      console.log(Check);
    } else {
      setCheck(Check.filter((id) => id !== e.target.value));
    }
  };
  useEffect(() => {
    const getFilter = async () => {
      if (newBrands.length === 0 && Check.length === 0) {
        const getItems = async () => {
          try {
            const res = await publicRequest.get(
              category
                ? `/api/items/find?category=${category}`
                : `/api/items/find`
            );
            setFilteredBrands(res.data);
          } catch (e) {
            console.log(e);
          }
        };
        getItems();
        console.log(filteredBrands);
      } else if (newBrands.length > 0 && Check.length === 0) {
        setFilteredBrands(
          Items.filter((Items) =>
            newBrands.some((cat) => [Items.brand].flat().includes(cat))
          )
        );
        console.log(Items);
      } else if (Check.length > 0 && newBrands.length === 0) {
        setFilteredBrands(
          Items.filter((Items) =>
            Check.some((ch) => [Items.inStock].flat().includes(ch))
          )
        );
        console.log(Items);
      } else {
        setFilteredBrands(
          Items.filter((Items) =>
            Check.some((ch) => [Items.inStock].flat().includes(ch))
          ).filter((Items) =>
            newBrands.some((cat) => [Items.brand].flat().includes(cat))
          )
        );
        console.log(Items);
      }
    };
    getFilter();
    console.log(Check);
  }, [category, newBrands, Check]);
  const handleSort = () => {
    setSorting(!sorting);
    if (state === false) {
      const sorted = [...filteredBrands].sort((a, b) =>
        a.salePrice > b.salePrice ? 1 : -1
      );
      setFilteredBrands(sorted);
      setState(true);
    } else if (state === true) {
      const sorted = [...filteredBrands].sort((a, b) =>
        a.salePrice < b.salePrice ? 1 : -1
      );
      setFilteredBrands(sorted);
      setState(false);
    }
  };
  const handlePop = () => {
    setPSorting(!sortingP);
    if (state === false) {
      const sortedP = [...filteredBrands].sort((a, b) =>
        a.popularity > b.popularity ? 1 : -1
      );
      setFilteredBrands(sortedP);
      setState(true);
    } else if (state === true) {
      const sortedP = [...filteredBrands].sort((a, b) =>
        a.popularity < b.popularity ? 1 : -1
      );
      setFilteredBrands(sortedP);
      setState(false);
    }
  };
  const handleSale = () => {
    setSSorting(!sortingS);
    if (sale === false) {
      const sortedS = [...filteredBrands].sort((a) =>
        a.promoType === "danger" ? 1 : -1
      );
      setFilteredBrands(sortedS);
      setSale(true);
    } else if (sale === true) {
      const sortedS = [...filteredBrands].sort((a) =>
        a.promoType !== "danger" ? 1 : -1
      );
      setFilteredBrands(sortedS);
      setSale(false);
    }
  };
  useEffect(() => {
    const handleWidth = () => {
      let widthToHideFrom = 650;
      if (window.innerWidth < widthToHideFrom) {
        setWidth(false);
      } else {
        setWidth(true);
      }
    };

    handleWidth();
  }, [window.innerWidth]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(16);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBrands.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [Fold, setFold] = useState(true);
  return (
    <>
      <Container>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/">{t("main")}</Breadcrumb.Item>
          <Breadcrumb.Item href="/catalog">{t("head0")}</Breadcrumb.Item>
          <Breadcrumb.Item active>
            <mark>{decodeURIComponent(category)}</mark>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex align-items-start">
          <button
            className="nobr-bttn pt-2 mt-1 pe-4"
            onClick={() => navigate(-1)}
          >
            <img src={back} />
          </button>
          <h1 className="bold mb-5 ">
            {decodeURIComponent(category)}
            <span className="ps-2 grey">
              {" "}
              - {currentPosts.length} {t("prod")}
            </span>
          </h1>
        </div>
      </Container>
      <Container className="d-flex align-items-start mb-3 sprodhandle1 justify-content-center">
        {Width && (
          <CatalogMenu
            query={query}
            setQuery={setQuery}
            value={value}
            setValue={setValue}
            handleInput={handleInput}
            handleChange={handleChange}
            handleInputChange={handleInputChange}
            checklist={checklist}
            handleCheck={handleCheck}
            Items={Items}
            newBrands={newBrands}
            Check={Check}
            Width={Width}
          ></CatalogMenu>
        )}
        <Container id="flex2" className="d-flex flex-wrap fluke p-0">
          <Container className="m-0 p-0">
            {!Width && (
              <CatalogMenu
                query={query}
                setQuery={setQuery}
                value={value}
                setValue={setValue}
                handleInput={handleInput}
                handleChange={handleChange}
                handleInputChange={handleInputChange}
                checklist={checklist}
                handleCheck={handleCheck}
                Items={Items}
                newBrands={newBrands}
                Check={Check}
                Width={Width}
              ></CatalogMenu>
            )}
            <Navbar
              collapseOnSelect
              expand="lg"
              bg="light"
              className="d-flex flex-column align-items-stretch low-nav ms-3"
              variant="dark"
            >
              <Container className="nav-fix">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse
                  id="responsive-navbar-nav"
                  className="d-flex justify-content-between"
                >
                  <Nav className="">
                    <Nav.Link className="black">{t("sort")} </Nav.Link>
                    <Nav.Link onClick={handleSort} className="black">
                      {t("price")}{" "}
                      {sorting ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}{" "}
                    </Nav.Link>
                    <Nav.Link onClick={handlePop} className="black">
                      {t("pop")}{" "}
                      {sortingP ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}{" "}
                    </Nav.Link>
                    <Nav.Link onClick={handleSale} className="black">
                      {t("sale")}{" "}
                      {sortingS ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}{" "}
                    </Nav.Link>
                  </Nav>
                  <Nav className="">
                    <Nav.Link>
                      <Button
                        variant="transparent"
                        onClick={() => setFold(true)}
                      >
                        <Image src={!Fold ? type1 : type1g}></Image>
                      </Button>
                    </Nav.Link>
                    <Nav.Link>
                      <Button
                        variant="transparent"
                        onClick={() => setFold(false)}
                      >
                        <Image src={!Fold ? type2g : type2}></Image>
                      </Button>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Container>

          <Container className="d-flex flex-wrap justify-content-start items-list-handle cataloghandle">
            {currentPosts
              //?.filter((Items) => Items.lng === myLocalStorageData)
              ?.filter((filtered) =>
                filtered.name.toLowerCase().includes(query)
              )
              ?.filter(
                (filtered) => filtered.salePrice > parseInt(value[0], 10)
              )
              ?.filter(
                (filtered) => filtered.salePrice < parseInt(value[1], 10)
              )
              ?.map((filtered) =>
                Fold ? (
                  <ItemModelForCat
                    Items={filtered}
                    key={filtered._id}
                    addToCompare={addToCompare}
                    removeFromCompare={removeFromCompare}
                    selectedItems={selectedItems}
                    onAdd={() => onAdd(filtered)}
                    onRemoveFromPage={() => onRemoveFromPage(filtered._id)}
                  ></ItemModelForCat>
                ) : (
                  <ItemsModelUnfold
                    Items={filtered}
                    key={filtered._id}
                    addToCompare={addToCompare}
                    removeFromCompare={removeFromCompare}
                    selectedItems={selectedItems}
                    onAdd={() => onAdd(filtered)}
                    onRemoveFromPage={() => onRemoveFromPage(filtered._id)}
                  ></ItemsModelUnfold>
                )
              )}
          </Container>

          <Container className="d-flex justify-content-center">
            <NewPagination
              postsPerPage={postsPerPage}
              totalPosts={filteredBrands.length}
              paginate={paginate}
            />
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default CatalogClass;
