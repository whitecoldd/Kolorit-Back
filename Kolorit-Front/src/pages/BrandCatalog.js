import React, { useState, useEffect } from "react";
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
import ItemModelForCat from '../comps/ItemModelForCat'
import { publicRequest } from "../requests/request";
const BrandCatalog = (
  onAdd,
  onRemoveFromPage,
  removeFromCompare,
  addToCompare,
  selectedItems
) => {
  const location = useLocation();
  const brand = location.pathname.split("/")[2];
  const [Items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(
          brand ? `/api/items/find?brand=${brand}` : `/api/items/find`
        );
        setItems(res.data);
      } catch (e) {}
    };
    getItems();
  }, [brand]);
  const [myLocalStorageData, setMyLocalStorageData] = useState({});
  useEffect(() => {
    const lng = localStorage.getItem("i18nextLng");
    setMyLocalStorageData(lng);
  }, []);
  console.log(Items.filter((Items) => Items.lng === myLocalStorageData).length)
  console.log(Items.filter((Items) => Items.lng === myLocalStorageData))
  return (
    <>
      <Container className="d-flex flex-wrap justify-content-start items-list-handle cataloghandle">
        {Items?.filter((Items) => Items.lng === myLocalStorageData)?.map(
          (Items) => (
            <ItemModelForCat
              Items={Items}
              key={Items._id}
              addToCompare={addToCompare}
              removeFromCompare={removeFromCompare}
              selectedItems={selectedItems}
              onAdd={() => onAdd(Items)}
              onRemoveFromPage={() => onRemoveFromPage(Items._id)}
            ></ItemModelForCat>
          )
        )}
      </Container>
    </>
  );
};

export default BrandCatalog;
