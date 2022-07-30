import React, { useState, useEffect } from 'react'
import { NavDropdown, Nav, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { publicRequest } from '../requests/request'
const MenuItemsDisplay = () => {
    const [Cat, setCat] = useState([])
    useEffect(() => {
        const getItems = async () => {
            try {
                const res = await publicRequest.get("/cat/find");
                setCat(res.data);
            } catch { }
        };
        getItems();
    }, []);
    const [item, setItem] = useState([])
    useEffect(() => {
        const getItems = async () => {
            try {
                const res = await publicRequest.get(`/items/find`)
                setItem(res.data)
            } catch (e) {

            }
        }
        getItems()
    }, [])

    return (
        <>

            {Cat?.map((Cat) =>
                <NavDropdown.Item className='d-flex align-items-center position-relative' type='button'>
                    <img width={20} height={20} src={Cat.img} />
                    <Nav.Link className='nav-fix' eventKey={Cat._id} >

                        <span>
                            <DropdownButton
                                key={'end'}
                                id={`dropdown-button-drop-end`}
                                drop={'end'}
                                variant="secondary"
                                title={` ${Cat.name} `}
                                
                            >
                                {item?.map((item) => {
                                    if (Cat.name === item.category[0] || Cat.name === item.category[1])
                                        return (
                                            <Dropdown.Item eventKey={item._id}><Link to={`/catalog/category/${item._id}`}>{item.name}</Link></Dropdown.Item>
                                        )
                                }
                                )}


                            </DropdownButton>
                        </span>
                    </Nav.Link>



                </NavDropdown.Item>
            )}

        </>
    )
}

export default MenuItemsDisplay