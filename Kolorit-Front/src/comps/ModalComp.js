import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Modal from "react-modal";
import Login from "../pages/Login";
import Register from "../pages/Register";
import i18n from "../i18";
import { useTranslation } from "react-i18next";
const ModalComp = ({ Open, setOpen, Log, setLog }) => {
  const customStyles = {
    content: {
      top: "55%",
      left: "50%",
      right: "60%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "auto",
      color: "white",
      background: "orange",
      borderRadius: "20px",
    },
    overlay: {
      zIndex: 1000,
    },
  };
  const { t, i18n } = useTranslation();

  return (
    <Modal isOpen={Open} style={customStyles}>
      {Log ? (
        <Container className="d-flex justify-content-around">
          <button className="nobr-bttn" onClick={() => setLog(true)}>
            <h1 className="bline ps-1 pe-1 pb-1">{t("reg")}</h1>
          </button>
          <button className="nobr-bttn" onClick={() => setLog(false)}>
            <h1 className=" ps-1 pe-1 pb-1">{t("enter")}</h1>
          </button>
        </Container>
      ) : (
        <Container className="d-flex justify-content-around">
          <button className="nobr-bttn" onClick={() => setLog(true)}>
            <h1 className=" ps-1 pe-1 pb-1">{t("reg")}</h1>
          </button>
          <button className="nobr-bttn" onClick={() => setLog(false)}>
            <h1 className="bline ps-1 pe-1 pb-1">{t("enter")}</h1>
          </button>
        </Container>
      )}
      {Log ? <Register Log={Log} setLog={setLog} /> : <Login Open={Open} setOpen={setOpen} />}
    </Modal>
  );
};

export default ModalComp;
