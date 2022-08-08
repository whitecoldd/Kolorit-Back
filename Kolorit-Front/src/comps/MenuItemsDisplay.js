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
const MenuItemsDisplay = () => {
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
    <div className="hovwhite">
      {Cat?.map((Cat) => (
        <div
          className="d-flex align-items-center position-relative dropdown1"
          type="button"
        >
          <img width={20} height={20} src={Cat.img} />
          <Nav.Link
            className="nav-fix d-flex align-items-center"
            eventKey={Cat._id}
          >
            <span className='hovwhite'>{Cat.name}</span>
            <div className="dropdown-content-menu">
              {subcat
                .filter(
                  (subcat) =>
                    subcat.cat[0].toLowerCase() === Cat.name.toLowerCase()
                )
                //?.filter((item) => item.lng === myLocalStorageData)
                .map((subcat) => {
                  return (
                    <div>
                      <Link to={`/catalog/${subcat.name}`}>
                        <h4>{subcat.name}</h4>
                      </Link>
                      {subsubcat
                        .filter(
                          (subsubcat) =>
                            subsubcat?.subcat[0]?.toLowerCase() ===
                            subcat.name.toLowerCase() ||
                            subsubcat?.subcat[1]?.toLowerCase() ===
                            subcat.name.toLowerCase()
                        )
                        .map((subsubcat) => {
                          return (
                            <Container>
                              <Link to={`/catalog/${subsubcat.name}`}>
                                <p className="mb-0">{subsubcat.name}</p>
                              </Link>
                            </Container>
                          );
                        })}
                    </div>
                  );
                })}
            </div>
          </Nav.Link>
        </div>
      ))}
    </div>
  );
};

export default MenuItemsDisplay;
