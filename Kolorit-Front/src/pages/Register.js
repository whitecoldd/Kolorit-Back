import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { register } from "../redux/apiCalls";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../requests/request";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { injectStyle } from "react-toastify/dist/inject-style";
const Register = () => {
  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [vis, setVis] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [inputs, setInputs] = useState({});
  if (typeof window !== "undefined") {
    injectStyle();
  }
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleVis = (e) => {
    e.preventDefault();
    setVis(!vis);
  };
  const admin = useSelector((state) => state.user.currentUser);
  const user = { ...inputs };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post(`/api/auth/register`, user);
      console.log(res.data);
      toast.success(t("regsuc"), {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (e) {
      console.log(e);
      toast.error(t("err"), {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const { t } = useTranslation();

  return (
    <>
      <Container className="w-98">
        <h2 className="white ps-4">{t('welcome')}</h2>
        <h6 className="white ps-4 pb-3">{t('welcome-reg')}</h6>
        <Form className="d-flex form-alter1 flex-column align-items-center">
          <Form.Group
            className="mb-3 d-flex flex-wrap form-div w-75"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Control
              type="email"
              name="email"
              placeholder={`E-mail ${t("address")}`}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex flex-wrap form-div w-75"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Control
              type="phone"
              name="phone"
              placeholder={t("phone")}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex flex-wrap form-div w-75"
            controlId="exampleForm.ControlInput2"
          >
            <Form.Control
              type="text"
              name="username"
              placeholder={t("name")}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex flex-wrap form-div w-75 position-relative"
            controlId="exampleForm.ControlInput5"
          >
            <Form.Control
              type={!vis ? "password": "text"}
              name="password"
              placeholder={t("pw")}
              onChange={handleChange}
            />
            <button onClick={handleVis} className="vispass">
              {!vis ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </Form.Group>
          {/* <Form.Group className="mb-3 d-flex flex-wrap  w-50" controlId="exampleForm.ControlInput6">
                        <Form.Label>Подтвердите пароль</Form.Label>
                        <Form.Control type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group> */}
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bttn-cart mb-3 mt-3"
          >
            {t("create")}
          </Button>
          <ToastContainer />
        </Form>
      </Container>
    </>
  );
};

export default Register;
