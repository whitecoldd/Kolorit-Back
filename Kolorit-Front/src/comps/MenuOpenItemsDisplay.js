import React, { useState, useEffect } from "react";
import {
  NavDropdown,
  Nav,
  DropdownButton,
  Container,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { publicRequest } from "../requests/request";
export const MenuOpenItemsDisplay = () => {
  const [Cat, setCat] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get("api/cat/find");
        setCat(res.data);
      } catch {}
    };
    getItems();
  }, []);
  const [subcat, setSubcat] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`api/subcat/find`);
        setSubcat(res.data);
      } catch (e) {}
    };
    getItems();
  }, []);
  const [subsubcat, setSubsubcat] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`api/subsubcat/find`);
        setSubsubcat(res.data);
      } catch (e) {}
    };
    getItems();
  }, []);

  const [myLocalStorageData, setMyLocalStorageData] = useState({});
  useEffect(() => {
    const lng = localStorage.getItem("i18nextLng");
    setMyLocalStorageData(lng);
  }, []);
  return (
    <>
      
     
    </>
  );
};
export default MenuOpenItemsDisplay;
