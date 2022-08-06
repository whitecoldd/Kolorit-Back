import React, { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Image,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import type1 from "../assets/type1.png";
import type2 from "../assets/type2.png";
import CatalogMenu from "../comps/CatalogMenu";
import ItemModelForCat from "../comps/ItemModelForCat";
import AppPagination from "../comps/AppPagination";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import { publicRequest } from "../requests/request";
import { useTranslation } from "react-i18next";

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
  const [inStock, setInStock] = useState(true);
  const [sorting, setSorting] = useState();
  const [sortingS, setSSorting] = useState();
  const [sortingP, setPSorting] = useState();
  const [state, setState] = useState("ASC");
  const [sale, setSale] = useState("w");
  const { t } = useTranslation();

  const handleSort = () => {
    setSorting(!sorting);
    if (state === "ASC") {
      const sorted = [...Items].sort((a, b) =>
        a.salePrice > b.salePrice ? 1 : -1
      );
      setItems(sorted);
      setState("DESC");
    } else if (state === "DESC") {
      const sorted = [...Items].sort((a, b) =>
        a.salePrice < b.salePrice ? 1 : -1
      );
      setItems(sorted);
      setState("ASC");
    }
  };
  const handleSale = () => {
    setSSorting(!sortingS);
    if (sale === "w") {
      const sortedS = [...Items].sort((a) =>
        a.promoType == "danger" ? 1 : -1
      );
      setItems(sortedS);
      setSale("w/o");
    } else if (sale === "w/o") {
      const sortedS = [...Items].sort((a) =>
        a.promoType !== "danger" ? 1 : -1
      );
      setItems(sortedS);
      setSale("w");
    }
  };

  const handlePop = () => {
    setPSorting(!sortingP);
  };

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
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(
          category ? `/api/items/find?category=${category}` : `/api/items/find`
        );
        setItems(res.data);
      } catch (e) {}
    };
    getItems();
  }, [category]);
  useEffect(() => {
    if (newBrands.length === 0) {
      setFilteredBrands(Items);
    } else {
      setFilteredBrands(
        Items.filter((Items) =>
          newBrands.some((cat) => [Items.brand].flat().includes(cat))
        )
      );
    }
  }, [newBrands]);

  const [myLocalStorageData, setMyLocalStorageData] = useState({});
  useEffect(() => {
    const lng = localStorage.getItem("i18nextLng");
    setMyLocalStorageData(lng);
  }, []);
  return (
    <>
      <Container className="d-flex align-items-start mb-3 sprodhandle1 justify-content-center">
        <CatalogMenu
          query={query}
          setQuery={setQuery}
          value={value}
          setValue={setValue}
          handleInput={handleInput}
          handleChange={handleChange}
          //Clear={Clear}
        ></CatalogMenu>
        <Container id="flex2" className="d-flex flex-wrap fluke">
          <Container>
            <Navbar
              collapseOnSelect
              expand="lg"
              bg="light"
              className="d-flex flex-column align-items-stretch low-nav"
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
                      {" "}
                      <Image src={type1}></Image>
                    </Nav.Link>
                    <Nav.Link>
                      <Image src={type2}></Image>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Container>

          <Container className="d-flex flex-wrap justify-content-start items-list-handle cataloghandle">
            {filteredBrands
              ?.filter((Items) => Items.lng === myLocalStorageData)
              ?.filter((Items) => Items.name.toLowerCase().includes(query))
              ?.filter((Items) => Items.salePrice > parseInt(value[0], 10))
              ?.filter((Items) => Items.salePrice < parseInt(value[1], 10))
              ?.map((Items) => (
                <ItemModelForCat
                  Items={Items}
                  key={Items._id}
                  addToCompare={addToCompare}
                  removeFromCompare={removeFromCompare}
                  selectedItems={selectedItems}
                  onAdd={() => onAdd(Items)}
                  onRemoveFromPage={() => onRemoveFromPage(Items._id)}
                ></ItemModelForCat>
              ))}
          </Container>

          <Container className="d-flex justify-content-center">
            <AppPagination
              setFilteredBrands={(item) => setFilteredBrands(item)}
              filteredBrands={filteredBrands}
            ></AppPagination>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default CatalogClass;
