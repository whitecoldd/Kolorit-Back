import React, { useState, useEffect } from "react";
import { Container, Button, Breadcrumb } from "react-bootstrap";
import { Header, Grid, Item, Table, Label } from "semantic-ui-react";
import ItemModelForCat from "../comps/ItemModelForCat";
import { publicRequest } from "../requests/request";
import { useTranslation } from "react-i18next";
import ItemModel from "../comps/ItemModelForComp";

const Compare = ({
  selectedItems,
  addToCompare,
  removeFromCompare,
  onAdd,
  onRemoveFromPage,
}) => {
  const [Items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await publicRequest.get("/api/items/find");
        setItems(res.data);
      } catch {}
    };
    getItems();
  }, []);
  const { t } = useTranslation();
  const [myLocalStorageData, setMyLocalStorageData] = useState({});
  useEffect(() => {
    const lng = localStorage.getItem("i18nextLng");
    setMyLocalStorageData(lng);
  }, []);

  useEffect(() => {
    const color = async () => {
      if (Items.inStock.includes(t("inuse"))) {
        setColor(false);
      } else {
        setColor(true);
      }
    };

    color();
  }, [Items]);
  const [color, setColor] = useState(false);
  return (
    <Container>
      <Breadcrumb className="pt-3">
        <Breadcrumb.Item href="/">{t("main")}</Breadcrumb.Item>
        <Breadcrumb.Item active>
          <mark>{t("head1")}</mark>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <Header as="h1" content={t("comp")} textAlign="center" />
        {selectedItems.length > 0 && (
          <Table definition>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Label color="orange" ribbon>
                    <div className="d-flex flex-column h-50v align-items-start">
                      <Button className="mb-4 gray-bg ps-5 pe-5">{t("chars")}</Button>
                      <Button className="mb-4 gray-bg ps-5 pe-5">{t("sims")}</Button>
                      <Button className="mb-4 gray-bg ps-5 pe-5">{t("difs")}</Button>
                    </div>
                  </Label>
                </Table.HeaderCell>
                {selectedItems.map((Items) => (
                  <Table.HeaderCell key={Items.id} width={100}>
                    <ItemModel
                      key={Items.id}
                      Items={Items}
                      selected={selectedItems}
                      addToCompare={addToCompare}
                      removeFromCompare={removeFromCompare}
                      onAdd={onAdd}
                      onRemoveFromPage={() => onRemoveFromPage(Items._id)}
                    />
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Label color="orange" ribbon>
                    {t("price")}
                  </Label>
                </Table.Cell>
                {selectedItems.map((Items) => (
                  <Table.Cell className="text-center" key={Items.id}>{Items.salePrice}</Table.Cell>
                ))}
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Label ribbon>
                    {t("car2")}
                  </Label>
                </Table.Cell>
                {selectedItems.map((Items) => (
                  <Table.Cell className="text-center red" key={Items.id} >{Items.promo}</Table.Cell>
                ))}
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Label color="teal" ribbon>
                    {t("inuse")}
                  </Label>
                </Table.Cell>
                {selectedItems.map((Items) => (
                  <Table.Cell
                    key={Items.id}
                    className={color ? "green text-center" : "gold text-center"}
                  >
                    {Items.inStock}
                  </Table.Cell>
                ))}
              </Table.Row>

              <Table.Row>
                <Table.Cell width={100}>
                  {selectedItems.slice(0, 1).map((Items) => (
                    <Label  color="pink" ribbon width={100}>
                      {Items.char1}
                    </Label>
                  ))}
                </Table.Cell>
                {selectedItems.map((Items) => (
                  <Table.Cell className="text-center" key={Items.id}>{Items.char1a}</Table.Cell>
                ))}
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  {selectedItems.slice(0, 1).map((Items) => (
                    <Label color="pink" ribbon>
                      {Items.char2}
                    </Label>
                  ))}
                </Table.Cell>
                {selectedItems.map((Items) => (
                  <Table.Cell className="text-center" key={Items.id}>{Items.char2a}</Table.Cell>
                ))}
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  {selectedItems.slice(0, 1).map((Items) => (
                    <Label color="pink" ribbon>
                      {Items.char3}
                    </Label>
                  ))}
                </Table.Cell>
                {selectedItems.map((Items) => (
                  <Table.Cell className="text-center" key={Items.id}>{Items.char3a}</Table.Cell>
                ))}
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  {selectedItems.slice(0, 1).map((Items) => (
                    <Label color="pink" ribbon>
                      {Items.char4}
                    </Label>
                  ))}
                </Table.Cell>
                {selectedItems.map((Items) => (
                  <Table.Cell className="text-center" key={Items.id}>{Items.char4a}</Table.Cell>
                ))}
              </Table.Row>
            </Table.Body>
          </Table>
        )}
        {/* <Grid columns={selectedItems.length} stackable padded divided>
          <Item.Group className="d-flex flex-wrap">
            {Items.filter((Items) => Items.lng === myLocalStorageData).map(
              (Items) => (
                <ItemModelForCat
                  key={Items.id}
                  Items={Items}
                  selected={selectedItems}
                  addToCompare={addToCompare}
                  removeFromCompare={removeFromCompare}
                  onAdd={onAdd}
                  onRemoveFromPage={() => onRemoveFromPage(Items._id)}
                />
              )
            )}
          </Item.Group>
        </Grid> */}
      </div>
    </Container>
  );
};

export default Compare;
