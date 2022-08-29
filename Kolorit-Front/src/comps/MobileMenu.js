import React, { useState, useEffect } from "react";
import { publicRequest } from "../requests/request";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import enter from "../assets/enter.png";
const MobileMenu = ({ Vision, setVision, Close }) => {
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
      {Vision && (
        <Container className="bg-gray br-10 mobile-menu-div">
          <Container className="mob-menu-wrap d-flex flex-column align-items-start">
            <Container className="d-flex justify-content-start m-0 p-0">
              <Container className={Btn ? "d-block m-0 p-0" : "d-none m-0 p-0"}>
                {Back ? (
                  <button className="nobr-bttn" onClick={handleBack1}>
                    <img src={enter} />
                  </button>
                ) : (
                  <button className="nobr-bttn" onClick={handleBack}>
                    <img src={enter} />
                  </button>
                )}
              </Container>
            </Container>
            {Cat.map((cat) => (
              <div>
                <button
                  className={!Vis2 ? "d-block nobr-bttn" : "d-none nobr-bttn"}
                  onClick={handleCats}
                >
                  {cat.name}
                </button>
                <div>
                  {subcat
                    .filter((subcats) =>
                      subcats.cat === cat.name
                    )
                    // .slice(0,1)
                    //?.filter((item) => item.lng === myLocalStorageData)
                    .map((subcats) => (
                      <div>
                        <button
                          onClick={handleCats1}
                          className={
                            Vis
                              ? "nobr-bttn black d-block m-0 p-0"
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
                                className={Vis1 ? "d-block m-0 p-0" : "d-none "}
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
              </div>
            ))}
          </Container>
        </Container>
      )}
    </>
  );
};

export default MobileMenu;
