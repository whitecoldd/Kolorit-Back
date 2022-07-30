import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Header, Grid, Item, Table, Label } from "semantic-ui-react"
import ItemModelForCat from '../comps/ItemModelForCat'
import { publicRequest } from '../requests/request'
import { useTranslation } from 'react-i18next'

const Compare = ({ selectedItems, addToCompare, removeFromCompare, onAdd, onRemoveFromPage }) => {
    const [Items, setItems] = useState([])
    useEffect(() => {
        const getItems = async () => {
            try {
                const res = await publicRequest.get("/items/find");
                setItems(res.data);
            } catch { }
        };
        getItems();
    }, []);
    const { t } = useTranslation()
    return (
        <Container>
            <div>
                <Header
                    as="h1"
                    content={t('comp')}
                    textAlign="center"
                />
                {selectedItems.length > 0 && (
                    <Table definition>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell></Table.HeaderCell>
                                {selectedItems.map((Items) => (
                                    <Table.HeaderCell key={Items.id}>{Items.name}</Table.HeaderCell>
                                ))}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="orange" ribbon>
                                        {t('price')}
                                    </Label>
                                </Table.Cell>
                                {selectedItems.map((Items) => (
                                    <Table.Cell key={Items.id}>{Items.salePrice}</Table.Cell>
                                ))}
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="teal" ribbon>
                                        {t('desc')}
                                    </Label>
                                </Table.Cell>
                                {selectedItems.map((Items) => (
                                    <Table.Cell key={Items.id}>{Items.description}</Table.Cell>
                                ))}
                            </Table.Row>

                            <Table.Row>

                                <Table.Cell>
                                    {selectedItems.slice(0,1).map((Items) => (
                                        <Label color="pink" ribbon>
                                            {Items.char1}
                                        </Label>
                                    ))}
                                </Table.Cell>
                                {selectedItems.map((Items) => (
                                    <Table.Cell key={Items.id}>{Items.char1a}</Table.Cell>
                                ))}
                            </Table.Row>

                            <Table.Row>

                                <Table.Cell>
                                    {selectedItems.slice(0,1).map((Items) => (
                                        <Label color="pink" ribbon>
                                            {Items.char2}
                                        </Label>
                                    ))}
                                </Table.Cell>
                                {selectedItems.map((Items) => (
                                    <Table.Cell key={Items.id}>{Items.char2a}</Table.Cell>
                                ))}
                            </Table.Row>
                            <Table.Row>

                                <Table.Cell>
                                    {selectedItems.slice(0,1).map((Items) => (
                                        <Label color="pink" ribbon>
                                            {Items.char3}
                                        </Label>
                                    ))}
                                </Table.Cell>
                                {selectedItems.map((Items) => (
                                    <Table.Cell key={Items.id}>{Items.char3a}</Table.Cell>
                                ))}
                            </Table.Row>
                            <Table.Row>

                                <Table.Cell>
                                    {selectedItems.slice(0,1).map((Items) => (
                                        <Label color="pink" ribbon>
                                            {Items.char4}
                                        </Label>
                                    ))}
                                </Table.Cell>
                                {selectedItems.map((Items) => (
                                    <Table.Cell key={Items.id}>{Items.char4a}</Table.Cell>
                                ))}
                            </Table.Row>
                        </Table.Body>
                    </Table>
                )}
                <Grid columns={selectedItems.length} stackable padded divided>
                    <Item.Group className='d-flex flex-wrap'>
                        {Items.map((Items) => (
                            <ItemModelForCat
                                key={Items.id}
                                Items={Items}
                                selected={selectedItems}
                                addToCompare={addToCompare}
                                removeFromCompare={removeFromCompare}
                                onAdd={onAdd}
                                onRemoveFromPage={() => onRemoveFromPage(Items._id)}
                            />
                        ))}
                    </Item.Group>
                </Grid>
            </div>
        </Container>
    )
}

export default Compare