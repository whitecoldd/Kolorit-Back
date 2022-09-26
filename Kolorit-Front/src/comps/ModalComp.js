import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Modal from "react-modal";
import Login from "../pages/Login";
import Register from "../pages/Register";
import i18n from "../i18";
import { useTranslation } from "react-i18next";
import regbg from '../assets/regbd.jpg'
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
      height: "auto",
      color: "white",
      background: "#282828",
      borderRadius: "43px",
      display: "flex",
      flexDirection: "row",
    },
    overlay: {
      zIndex: 1200,
    },
  };
  const { t, i18n } = useTranslation();

  return (
    <Modal isOpen={Open} className="my-modal-window1" style={customStyles}>

      <div>
        {Log ? (
          <Container className="d-flex justify-content-around p-3 me-2 pe-5">
            <button className="nobr-bttn" onClick={() => setLog(true)}>
              <h4 className="bline ps-1 pe-1 pb-1 white">{t("reg")}</h4>
            </button>
            <button className="nobr-bttn" onClick={() => setLog(false)}>
              <h4 className=" ps-1 pe-1 pb-1 white">{t("enter")}</h4>
            </button>
          </Container>
        ) : (
          <Container className="d-flex justify-content-around p-3 me-2 pe-5">
            <button className="nobr-bttn" onClick={() => setLog(true)}>
              <h4 className=" ps-1 pe-1 pb-1 white">{t("reg")}</h4>
            </button>
            <button className="nobr-bttn" onClick={() => setLog(false)}>
              <h4 className="bline ps-1 pe-1 pb-1 white">{t("enter")}</h4>
            </button>
          </Container>
        )}
        {Log ? (
          <Register Log={Log} setLog={setLog} />
        ) : (
          <Login Open={Open} setOpen={setOpen} />
        )}
      </div>
      <div className="pic-reg">
        <img src={regbg} />
      </div>
      <div className="position-absolute btn-reg">
        <button onClick={() => setOpen(false)} className="bttn-x">
          X
        </button>
      </div>
    </Modal>
  );
};

export default ModalComp;
