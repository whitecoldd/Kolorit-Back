import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { login } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loginFailure, loginStart, loginSuccess } from "../redux/userRedux";
import { publicRequest, userRequest } from "../requests/request";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const Login = ({ setOpen }) => {
  const [inputs, setInputs] = useState({});
  const [log, setLog] = useState(true);
  const [vis, setVis] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  if (typeof window !== "undefined") {
    injectStyle();
  }
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const user = { ...inputs };
  const { isFetching, error } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/api/auth/login", user);
      dispatch(loginSuccess(res.data));
      history("/profile");
      toast.success(t("authsuc"), {
        position: toast.POSITION.TOP_RIGHT,
      });
      setOpen(false);
    } catch (err) {
      dispatch(loginFailure());
      toast.error(t("err"), {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleVis = (e) => {
    e.preventDefault();
    setVis(!vis);
  };

  return (
    <>
      <Container className="">
        <h2 className="white ps-4">{t("missed")}</h2>
        <h6 className="white ps-4">{t("welcome-log")}</h6>
        <Form className="d-flex flex-column align-items-center form-alter1 form-pos1">
          <Form.Group
            className="mb-3 d-flex flex-wrap form-div w-75"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Control
              type="text"
              name="email"
              placeholder={t("regspace")}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex flex-wrap form-div w-75 position-relative"
            controlId="exampleForm.ControlInput122"
          >
            <Form.Control
              type={!vis ? "password" : "text"}
              name="password"
              placeholder={t("pw")}
              onChange={handleChange}
            />
            <button onClick={handleVis} className="vispass">
              {!vis ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </Form.Group>

          <Button
            onClick={handleClick}
            disabled={isFetching}
            className="bttn-cart mb-3"
          >
            {t("auth")}
          </Button>
        </Form>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Login;
