import React, { useState, useEffect } from "react";
import {
  Accordion,
  Container,
  InputGroup,
  Form,
  Button,
  Nav,
  Navbar,
  Select,
} from "react-bootstrap";
import { Box, Slider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { publicRequest } from "../requests/request";
function valuetext(value) {
  return `${value}`;
}
const CatalogMenu = ({
  setQuery,
  value,
  handleCheck,
  inStock,
  handleFilter,
  handleFilterChange,
  handleChange,
  handleInput,
  Clear,
  handleBrands,
}) => {
  const { t } = useTranslation();
  const [Items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`/brand/find`);
        setItems(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getItems();
  }, []);
  return (
    <>
      <Container id="flex1" className="catalog-menu m-0">
        <Accordion className="catalog-acc">
          <Accordion.Item>
            <Accordion.Header>{t("avail")}</Accordion.Header>
            <Accordion.Body name="inStock" onChange={handleCheck}>
              <InputGroup>
                <InputGroup.Checkbox></InputGroup.Checkbox>
                <InputGroup.Text>{t("inuse")}</InputGroup.Text>
              </InputGroup>
              <InputGroup>
                <InputGroup.Checkbox></InputGroup.Checkbox>
                <InputGroup.Text>{t("avail")}</InputGroup.Text>
              </InputGroup>
              <InputGroup>
                <InputGroup.Checkbox></InputGroup.Checkbox>
                <InputGroup.Text>{t("ordertom")}</InputGroup.Text>
              </InputGroup>
              <InputGroup>
                <InputGroup.Checkbox></InputGroup.Checkbox>
                <InputGroup.Text>{t("later")}</InputGroup.Text>
              </InputGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>{t("price")}</Accordion.Header>
            <Accordion.Body>
              <Box sx={{ width: 300 }}>
                <Slider
                  sx={{ width: 200, backgroundColor: "warning" }}
                  valueLabelDisplay="Price range"
                  value={value}
                  onChange={handleChange}
                  onInput={handleInput}
                  min={0}
                  max={40000}
                  getAriaValueText={valuetext}
                />
              </Box>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>{t("prods")}</Accordion.Header>
            <Accordion.Body className='d-flex flex-wrap justify-content-center'>
              <InputGroup>
                <InputGroup.Checkbox></InputGroup.Checkbox>
                <InputGroup.Text>{t("allprods")}</InputGroup.Text>
              </InputGroup>
              <InputGroup>
                <Form.Control
                  placeholder="Поиск..."
                  id="search"
                  aria-label="Search"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </InputGroup>

              <select name="brand" className="classic mt-3" onChange={handleFilter}>
                {Items.map((item) => (
                  <option>{item.name}</option>
                ))}
              </select>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>{t("wdt")}</Accordion.Header>
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>{t("model")}</Accordion.Header>
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>{t("wt")}</Accordion.Header>
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>{t("el")}</Accordion.Header>
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>{t("chargetype")}</Accordion.Header>
          </Accordion.Item>
        </Accordion>
        <Container className="d-flex justify-content-center pt-1 pb-3">
          <Button variant="outline-dark" onClick={Clear} className="catalog-menu-bttn">
            Сбросить
          </Button>
        </Container>
      </Container>
    </>
  );
};

export default CatalogMenu;
