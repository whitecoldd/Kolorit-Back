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
import {
  Box,
  Slider,
  Typography,
  TextField,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { publicRequest } from "../requests/request";
function valuetext(value) {
  return `${value}`;
}
const CatalogMenu = ({
  setQuery,
  value,
  setValue,
  handleCheck,
  checklist,
  handleFilter,
  handleInputChange,
  handleChange,
  handleInput,
  Clear,
  newBrands,
  handleBrands,
  Check,
}) => {
  const { t } = useTranslation();
  const [Brands, setBrands] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get(`/api/brand/find`);
        setBrands(res.data);
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
            <Accordion.Body>
              <FormControl>
                {/* <TextField value={newBrands} fullWidth onChange={handleChange} /> */}
                <FormGroup className="d-flex justify-content-start">
                  <div className="d-flex flex-column justify-content-start p-0 ms-0   ">
                    {checklist.map((check) => (
                      <FormControlLabel
                      key={check.inStock}
                        control={
                          <Checkbox size="small" onChange={handleCheck} />
                        }
                        label={check.inStock}
                        value={check.inStock}
                      />
                    ))}
                  </div>
                </FormGroup>
              </FormControl>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>{t("price")}</Accordion.Header>
            <Accordion.Body>
              <Box sx={{ width: 300 }}>
                <Typography className="d-flex align-items-center">
                  <input
                    type="text"
                    className="pricebox me-3"
                    value={value[0]}
                    //onChange={(e) => handleInputChange(e)}
                  ></input>{" "}
                  <span className="ls-0 orange">---</span>{" "}
                  <input
                    type="text"
                    className="pricebox ms-3"
                    value={value[1]}
                    //onChange={(e) => handleInputChange(e)}
                  ></input>
                </Typography>
                <Slider
                  sx={{ width: 200, backgroundColor: "warning" }}
                  //valueLabelDisplay="auto"
                  value={value}
                  onChange={handleInput}
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
            <Accordion.Body className="d-flex flex-wrap justify-content-start">
              {/* <InputGroup>
              <FormControlLabel
                      className=""
                      control={<Checkbox size="small" onChange={handleChange} />}
                      label={t('allprods')}
                      value={t('allprods')}
                    />
              </InputGroup> */}
              <InputGroup>
                <Form.Control
                  placeholder="Поиск..."
                  id="search"
                  aria-label="Search"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </InputGroup>

              <FormControl>
                {/* <TextField value={newBrands} fullWidth onChange={handleChange} /> */}
                <FormGroup className="d-flex justify-content-start">
                  <div className="scrollable-div d-flex flex-column justify-content-start p-0 ms-0   ">
                    {Brands.map((item) => (
                      <FormControlLabel
                        key={item._id}
                        control={
                          <Checkbox size="small" onChange={handleChange} />
                        }
                        label={item.name}
                        value={item.name}
                      />
                    ))}
                  </div>
                </FormGroup>
              </FormControl>
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
          <Button
            variant="outline-dark"
            onClick={Clear}
            className="catalog-menu-bttn"
          >
            Сбросить
          </Button>
        </Container>
      </Container>
    </>
  );
};

export default CatalogMenu;
