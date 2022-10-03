import React from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Success = () => {
  const { t } = useTranslation();
  return (
    <>
      <Container>
        <Breadcrumb className="pt-3">
          <Breadcrumb.Item href="/">{t("main")}</Breadcrumb.Item>
          <Breadcrumb.Item href="/cart">{t("head2")}</Breadcrumb.Item>
          <Breadcrumb.Item active>
            <mark>{t("procorder")}</mark>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Container className="ps-0 pt-4">
          <h1 className="procorder ps-0">{t("procorder")}</h1>
        </Container>
        <Container className="terminal">
            <h2 className="p-5">{t("thx")}</h2>
            <a href="/" className="bttn-continue">{t("continue")}</a>
        </Container>
      </Container>
    </>
  );
};

export default Success;
