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
import arrowcatalog from '../assets/arrowcatalog.svg'
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

  const [Arrow, setArrow] = useState(false)
  return (
    <div className="hovwhite position-relative">
      <div className="scrollable-div-menu pt-2">
        {Cat?.map((Cat) => (
          <div
            className="d-flex align-items-end justify-content-start dropdown2 mt-0 mb-0 pt-1 pb-1"
            type="button"
          >
            <img width={20} height={20} src={Cat.img} />
            <Nav.Link
              className="nav-fix d-flex align-items-center justify-content-start"
              eventKey={Cat._id}
            >
              <Link to={`/catalog/${Cat.name}`} onMouseEnter={()=>setArrow(true)} onMouseLeave={()=>setArrow(false)} className="real-no-dec exact-hover d-flex justify-content-start w-99">
                <span className="cat1">{Cat.name}</span>
                
              </Link>
              <img className="newclass" /*{Arrow ? "d-block" : "d-none"}*/ src={arrowcatalog}/>
              <div className="wrapper">
                <div className="dropdown-content-menu">
                  <h1 className="pt-1 ps-2 cat1-ins">{Cat.name}</h1>
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
                              <h4 className="cat2">{subcat.name}</h4>
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
                                    <Link
                                      to={`/catalog/title/${subcat.name}/${subsubcat.name}`}
                                    >
                                      <p className="mb-0 cat3" >{subsubcat.name}</p>
                                    </Link>
                                  </Container>
                                );
                              })}
                          </div>
                        );
                      })}
                  </div>
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
