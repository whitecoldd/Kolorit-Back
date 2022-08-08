import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../requests/request";

const BrandsItemDisplay = ({ item, Items }) => {
  return (
    <>
      <Link
        to={`/brandscatalog/${item.name}`}
        className="black pe-5 ps-5 me-5 ms-5"
      >
        {item.name} ({Items})
      </Link>
    </>
  );
};
export default BrandsItemDisplay;
