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
        console.log(res.data);
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
    <div className="hovwhite position-relative">
      <div className="scrollable-div-menu">
        {Cat?.map((Cat) => (
          <div className="d-flex align-items-end dropdown2 mt-0 mb-0 pt-1 pb-1" type="button">
            <img width={20} height={20} src={Cat.img} />
            <Nav.Link
              className="nav-fix d-flex align-items-center"
              eventKey={Cat._id}
            >
              <Link to={`/catalog/${Cat.name}`} className="real-no-dec">
                <span>{Cat.name}</span>
              </Link>
              <div className="dropdown-content-menu">
                <h1 className="pt-1 ps-1">{Cat.name}</h1>
                <div className="dropdown-content-all">
                  {subcat
                    .filter((subcat) =>
                      [Cat.name].some((catname) =>
                        [subcat.cat].flat().includes(catname)
                      )
                    )
                    //?.filter((item) => item.lng === myLocalStorageData)
                    .map((subcat) => {
                      return (
                        <div>
                          <Link to={`/catalog/${Cat.name}/${subcat.name}`}>
                            <h4>{subcat.name}</h4>
                          </Link>
                          {subsubcat
                            .filter((subsubcat) =>
                              [subcat.name].some((subname) =>
                                [subsubcat.subcat].flat().includes(subname)
                              )
                            )
                            .map((subsubcat) => {
                              return (
                                <Container>
                                  <Link to={`/catalog/title/${subcat.name}/${subsubcat.name}`}>
                                    <p className="mb-0">{subsubcat.name}</p>
                                  </Link>
                                </Container>
                              );
                            })}
                        </div>
                      );
                    })}
                </div>
              </div>
            </Nav.Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItemsDisplay;
