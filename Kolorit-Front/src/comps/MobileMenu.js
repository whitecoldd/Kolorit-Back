import React, { useState, useEffect } from "react";
import { publicRequest } from "../requests/request";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import enter from "../assets/enter.png";
import arrowcatalog from "../assets/arrowcatalog.svg";
import { useTranslation } from "react-i18next";

const MobileMenu = ({ Vision, setVision, Close }) => {
  const [Button1, setButton1] = useState();
  const [Button2, setButton2] = useState();
  //const [Button1, setButton1] = useState()
  const [Vis, setVis] = useState(false);
  const handleCats = (e) => {
    e.preventDefault();
    setVis(!Vis);
    setVis2(!Vis2);
    setBtn(true);
    setButton1(e.target.innerText);
    console.log(Button1);
  };
  const { t, i18n } = useTranslation();
  const [Vis1, setVis1] = useState(false);
  const handleCats1 = (e) => {
    e.preventDefault();
    setVis1(true);
    setVis(false);
    setBack(true);
    setButton2(e.target.innerText);
    console.log(Button2);
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
        const res = await publicRequest.get(`api/subcat/find?cat=${Button1}`);
        setSubcat(res.data);
      } catch (e) {}
    };
    getItems();
  }, [Button1]);
  const [subsubcat, setSubsubcat] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(
          `api/subsubcat/find?subcat=${Button2}`
        );
        setSubsubcat(res.data);
      } catch (e) {}
    };
    getItems();
  }, [Button2]);

  const [myLocalStorageData, setMyLocalStorageData] = useState({});
  useEffect(() => {
    const lng = localStorage.getItem("i18nextLng");
    setMyLocalStorageData(lng);
  }, []);
  return (
    <>
      {Vision && (
        <Container className="bg-gray mobile-menu-div p-0 ">
          <Container className="mob-menu-wrap d-flex flex-column scrollbar-cat align-items-start p-0">
            <h2 className={!Vis2 ? "d-block ps-2" : "d-none"}>{t("cat")}</h2>
            <Container className="d-flex justify-content-start ms-0 me-0 mt-0 mb-3 p-0 smth">
              <Container className={Btn ? "d-block m-0 p-0" : "d-none m-0 p-0"}>
                {Back ? (
                  <button
                    className="nobr-bttn d-flex align-items-center smth"
                    onClick={handleBack1}
                  >
                    <img src={enter} />
                    <h2 className="ps-2">{Button2}</h2>
                  </button>
                ) : (
                  <button
                    className="nobr-bttn d-flex align-items-center smth"
                    onClick={handleBack}
                  >
                    <img src={enter} />
                    <h2 className="ps-2">{Button1}</h2>
                  </button>
                )}
              </Container>
            </Container>
            {Cat.map((cat) => (
              <div>
                <button
                  className={
                    !Vis2
                      ? "d-block nobr-bttn d-flex align-items-center justify-content-between w-100v "
                      : "d-none nobr-bttn"
                  }
                  onClick={handleCats}
                >
                  <div className="d-flex align-items-center">
                    <img
                      width={40}
                      height={30}
                      className="me-2"
                      src={cat.img}
                    />
                    <h4 className="black fs-12">{cat.name}</h4>
                  </div>
                  <img src={arrowcatalog} className="mb-2" />
                </button>

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
                            Vis
                              ? "nobr-bttn black d-flex align-items-center justify-content-between w-100v"
                              : "nobr-bttn black d-none"
                          }
                        >
                          <div className="d-flex align-items-center">
                            <img
                              width={40}
                              className="me-2"
                              src={subcats.img}
                            />
                            <h4 className="black">{subcats.name}</h4>
                          </div>
                          <img src={arrowcatalog} className="mb-2" />
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
                                  Vis1
                                    ? "d-flex align-items-center justify-content-between w-100v"
                                    : "d-none"
                                }
                              >
                                <Link
                                  to={`/catalog/title/${subsubcats.subcat}/${subsubcats.name}`}
                                  className="mb-0 black real-no-dec d-flex align-items-center"
                                >
                                  <img
                                    width={40}
                                    className="me-2"
                                    src={subsubcats.img}
                                  />
                                  <h4 className="black">{subsubcats.name}</h4>
                                </Link>
                                <img src={arrowcatalog} className="mb-2" />
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
