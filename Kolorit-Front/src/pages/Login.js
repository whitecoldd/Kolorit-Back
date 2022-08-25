import React, { useState } from "react";
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
const Login = ({ setOpen }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useNavigate();
  if (typeof window !== "undefined") {
    injectStyle();
  }
  const { isFetching, error } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/api/auth/login", {
        username,
        password,
      });
      dispatch(loginSuccess(res.data));
      history("/profile");
      toast.success(t("authsuc"), {
        position: toast.POSITION.TOP_RIGHT,
      });
      setOpen(false)
    } catch (err) {
      dispatch(loginFailure());
      toast.error(t("err"), {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <>
      <Container>
        <Form className="d-flex flex-column align-items-center form-alter1 form-pos1">
          <Form.Group
            className="mb-3 d-flex flex-wrap form-div w-50"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>{t("name")}</Form.Label>
            <Form.Control
              type="text"
              placeholder="имяФамилия"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex flex-wrap form-div w-50"
            controlId="exampleForm.ControlInput122"
          >
            <Form.Label>{t("pw")}</Form.Label>
            <Form.Control
              type="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
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
