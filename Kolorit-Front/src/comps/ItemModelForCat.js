import React, { useState, useEffect, Component } from "react";
import { Container, Image, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import buy from "../assets/tocart.png";
import bought from "../assets/bought.png";
import com from "../assets/com.png";
import heart from "../assets/heart-sm.png";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requests/request";
import { useTranslation } from "react-i18next";

const ItemModel = (props) => {
  const { Items, onAdd, onRemoveFromPage, addToCompare, removeFromCompare } =
    props;
  const [isAdded, setIsAdded] = useState(false);
  const [isAddedC, setIsAddedC] = useState(false);
  const { t, i18n } = useTranslation();

  const onClickBuy = () => {
    setIsAdded(!isAdded);
    if (isAdded) {
      onRemoveFromPage(Items.id);
    } else {
      onAdd(Items);
    }
  };
  const [isShown, setIsShown] = useState(false);

  const Compare = () => {
    setIsAddedC(!isAddedC);
    if (isAddedC) {
      removeFromCompare(Items);
    } else {
      addToCompare(Items);
    }
  };
  const SetPromoType = async () => {
    if (Items.promo === t("sale")) {
      Items.promoType = "danger";
    } else if (Items.promo === t("new")) {
      Items.promoType = "warning";
    } else if (Items.promo === " ") {
      Items.promoType = "transparent";
    } else {
      Items.promoType = "secondary";
    }
  };

  return (
    <>
      <Container
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        key={Items.id}
        className="d-flex flex-wrap align-content-between mt-2 mb-2 sales-prod w-23 m-1 p-2"
      >
        <Container className="d-flex align-items-start justify-content-between m-0 p-0">
          <Badge onMouseEnter={SetPromoType()} bg={Items.promoType}>
            {Items.promo}
          </Badge>
          {isShown && (
            <Container className="p-0 m-0 d-flex justify-content-end">
              <button className="nobr-bttn " onClick={Compare}>
                <Image src={com}></Image>
              </button>
              <Image className="" src={heart}></Image>{" "}
            </Container>
          )}
        </Container>
        <Container className="d-flex flex-column align-items-start img-on-hover">
          <Container>
            <Link to={`/catalog/category/${Items._id}`}>
              <img className="img-cat-adapt-1" src={Items.img}/>
            </Link>
          </Container>
          <b>{Items.name}</b>
          <Container className="d-flex flex-nowrap align-items-end low-item p-0">
            <Container
              fluid
              className="d-flex flex-column text-float align-items-start ps-0"
            >
              <span>
                <del
                  className="grey fs-12"
                  style={{ fontSize: "11px", fontWeight: "300" }}
                >
                  {Items.price}
                </del>
                <del
                  className="grey"
                  style={{ fontSize: "10px", fontWeight: "300" }}
                >
                  {" "}
                  {Items.currency}
                </del>
              </span>
              <h4 className="fs-12">
                {Items.salePrice}{" "}
                <small className="fs-10"> {Items.currency}</small>
              </h4>
            </Container>
            <Button variant="warning" className="bttnbuy" onClick={onClickBuy}>
              <Image src={isAdded ? bought : buy}></Image>
            </Button>
          </Container>
        </Container>
      </Container>
    </>
  );
};
export default ItemModel;
