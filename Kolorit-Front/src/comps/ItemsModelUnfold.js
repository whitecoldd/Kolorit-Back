import React, { useState, useEffect, Component } from "react";
import { Container, Image, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import buy from "../assets/tocart.png";
import bought from "../assets/bought.png";
import com from "../assets/com.png";
import heart from "../assets/heart-sm.png";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requests/request";
import { t } from "i18next";
const ItemsModelUnfold = (props) => {
  const { Items, onAdd, onRemoveFromPage, addToCompare, removeFromCompare } =
    props;
  const [isAdded, setIsAdded] = useState(false);
  const [isAddedC, setIsAddedC] = useState(false);

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
    if (Items.promo === "Скидка") {
      Items.promoType = "danger";
    } else if (Items.promo === "Новое") {
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
        className="d-flex flex-wrap align-content-between mt-2 mb-2 sales-prod w-100 m-1 p-2"
      >
        <Badge onMouseEnter={SetPromoType()} bg={Items.promoType}>
          {Items.promo}
        </Badge>
        <Container className="d-flex align-items-start justify-content-start">
          <Container className="d-flex ">
            <Link to={`/catalog/category/${Items._id}`}>
              <Image width="90%" className="fleximg " height="100%" src={Items.img}></Image>
            </Link>
          </Container>
          <Container className="d-flex flex-column justify-content-between h-75">
            <b>{Items.name}</b>
            <Container className="ps-0 ms-0">
              <span className="fs-11 d-flex justify-content-between grey">
                {t("producer")} <b>{Items.brand}</b>
              </span>
              <span className="fs-11 d-flex justify-content-between grey">
                {Items.char1} <b>{Items.char1a}</b>
              </span>
              <span className="fs-11 d-flex justify-content-between grey">
                {Items.char2} <b>{Items.char2a}</b>
              </span>
            </Container>
          </Container>

          <Container className="d-flex flex-nowrap align-items-end low-item p-0">
            <Container
              fluid
              className="d-flex flex-column text-float align-items-end ps-0"
            >
              <del
                className="grey fs-12"
                style={{ fontSize: "11px", fontWeight: "300" }}
              >
                {Items.price}
                <small
                  className="grey fs-10"
                  style={{ fontSize: "17px", fontWeight: "300" }}
                >
                  {" "}
                  {Items.currency}
                </small>
              </del>
              <h4 className="fs-12">
                {Items.salePrice}{" "}
                <small className="fs-10"> {Items.currency}</small>
              </h4>
            </Container>
            <Container className="d-flex flex-column align-items-center">
              <button className="nobr-bttn" onClick={Compare}>
                <Image src={com}></Image>
                <br />
                <span className="grey">{t("head1")}</span>
              </button>
              <button className="nobr-bttn" disabled>
                <Image src={heart}></Image>
                <br />
                <span className="grey">{t("favs")}</span>
              </button>
              <Button
                variant="warning"
                className="bttnbuy mt-4"
                onClick={onClickBuy}
              >
                <Image src={isAdded ? bought : buy}></Image>
              </Button>
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
};
export default ItemsModelUnfold;
