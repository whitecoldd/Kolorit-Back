import React, { useState, useEffect } from "react";
import {
  Container,
  NavDropdown,
  Nav,
  DropdownButton,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { publicRequest } from "../requests/request";
const NewMobileMenu = () => {
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
  const [Vis, setVis] = useState(false);
  const handleCats = (e) => {
    e.preventDefault();
    setVis(!Vis);
    setVis2(!Vis2);
    setBtn(true);
  };
  const [Vis1, setVis1] = useState(false);
  const handleCats1 = (e) => {
    e.preventDefault();
    setVis1(true);
    setVis(false);
    setBack(true);
  };
  const [Vis2, setVis2] = useState(false);
  const [Back, setBack] = useState(false);
  const handleBack = (e) => {
    e.preventDefault();
    setBack(!Back);
    handleCats(e);
    setBtn(false);
    setBack(false);
  };
  const handleBack1 = (e) => {
    e.preventDefault();
    setBack(false);
    setVis(true);
    setVis2(true);
    setVis1(false);
  };
  const [Btn, setBtn] = useState(false);
  return (
    <>
      {Cat?.map((cat) => (
        <NavDropdown.Item
          className="d-flex align-items-center position-relative"
          type="button"
        >
          <Nav.Link
            eventKey={cat._id}
            className={!Vis2 ? "d-block nobr-bttn nav-fix" : "d-none nobr-bttn"}
            onClick={handleCats}
          >
            <img width={20} height={20} src={cat.img} />
            <span>
              <DropdownButton
                key={"end"}
                id={`dropdown-button-drop-end`}
                drop={"end"}
                variant="secondary"
                title={` ${cat.name} `}
              >
                <div>
                  {subcat
                    .filter((subcats) => subcats.cat === cat.name)
                    // .slice(0,1)
                    //?.filter((item) => item.lng === myLocalStorageData)
                    .map((subcats) => (
                      <div>
                        <button
                          onClick={handleCats1}
                          className={
                            !Vis
                              ? "nobr-bttn white d-block m-0 p-0"
                              : "nobr-bttn black d-none"
                          }
                        >
                          {subcats.name}
                        </button>
                        <div>
                          {subsubcat
                            .filter((subsubcats) =>
                              [subcats.name].some((subname) =>
                                [subsubcats.subcat].flat().includes(subname)
                              )
                            )
                            .map((subsubcats) => (
                              <Container
                                className={
                                  Vis1 ? "d-block white m-0 p-0" : "d-none "
                                }
                              >
                                <Link to="/" className="mb-0 black real-no-dec">
                                  {subsubcats.name}
                                </Link>
                              </Container>
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              </DropdownButton>
            </span>
          </Nav.Link>
        </NavDropdown.Item>
      ))}
    </>
  );
};

export default NewMobileMenu;
