import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../requests/request";

const BrandsItemDisplay = ({ item }) => {
  const [Items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`/api/items/find?brand=${item.name}`);
        setItems(res.data);
      } catch (e) {}
    };
    getItems();
  }, [item]);
  return (
    <>
      <Link
        to={`/brandscatalog/${item.name}`}
        className="black pe-5 ps-5 me-5 ms-5"
      >
        {item.name} ({Items.length})
      </Link>
    </>
  );
};
export default BrandsItemDisplay;
