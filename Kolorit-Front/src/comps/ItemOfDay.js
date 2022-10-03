import Countdown from "react-countdown";
import React, { useState, useEffect, Component } from "react";
import { Container, Image, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import buy from "../assets/tocart.png";
import bought from "../assets/bought.png";
import com from "../assets/com.png";
import heart from "../assets/heart-sm.png";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
const ItemOfDay = (props) => {
  const { Items, onAdd, onRemoveFromPage, addToCompare, removeFromCompare } =
    props;
  const [isAdded, setIsAdded] = useState(false);
  const [isAddedC, setIsAddedC] = useState(false);
  const { t } = useTranslation();

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
        className="w-100"
      >
        <Container className="p-0 m-0 d-flex align-items-start justify-content-between itemofday-top">
          <Badge onMouseEnter={SetPromoType()} bg={Items.promoType}>
            {Items.promo}
          </Badge>
          {isShown && (
            <Container className="d-flex justify-content-end">
              <button className="nobr-bttn" onClick={Compare}>
                <Image src={com}></Image>
              </button>
              <Image className="" src={heart}></Image>{" "}
            </Container>
          )}
        </Container>
        <h3 className="text-center">{t("itemofday")}:</h3>

        <Container className="d-flex flex-column align-items-center justify-content-between img-on-hover">
          <Container>
            <Link to={`/catalog/category/${Items._id}`}>
              <Image width="90%" height="100%" src={Items.img}></Image>
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
          <Countdown date={dayjs(Items.createdAt) + 86399000} />
        </Container>
      </Container>
    </>
  );
};

export default ItemOfDay;
