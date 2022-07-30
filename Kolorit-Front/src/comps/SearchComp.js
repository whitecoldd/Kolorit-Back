import React, { useState } from 'react'
import { Container, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import buy from '../assets/tocart.png'
import bought from '../assets/bought.png'
const ItemModel = (props) => {
    const { Items, onAdd, onRemoveFromPage, addToCompare, removeFromCompare } = props;
    const [isAdded, setIsAdded] = useState(false);
    const [isAddedC, setIsAddedC] = useState(false);

    const onClickBuy = () => {
        setIsAdded(!isAdded);
        if (isAdded) {
            onRemoveFromPage(Items.id);
        } else {
            onAdd(Items);
        }
    }

    const Compare = () => {
        setIsAddedC(!isAddedC)
        if (isAddedC) {
            removeFromCompare(Items);
        } else {
            addToCompare(Items);
        }
    }

    return (
        <>
            <Container key={Items.id} className='d-flex align-items-center justify-content-start list-group-item list-group-item-action search-items'>
                <Container className='d-flex justify-content-start'>
                    <Link to={`/catalog/category/${Items._id}`}><Image width='90%' height='100%' src={Items.img} ></Image></Link>
                </Container>
                <b>{Items.name}</b>
                <Container className='d-flex flex-nowrap align-items-end justify-content-end low-item p-0'>
                    <Container className='d-flex flex-column align-items-end'>
                        <h4 className='black'>{Items.salePrice} </h4><small> {Items.currency}</small>
                    </Container>


                    <Button variant='warning' className='bttnbuy' onClick={onClickBuy}><Image src={isAdded ? bought : buy}></Image></Button>
                </Container>
            </Container>
        </>
    )
}
export default ItemModel