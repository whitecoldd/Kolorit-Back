const router = require('express').Router()
const Brand = require('../models/Brands')
const { verifyToken, verifyTokenAndAuthor, verifyTokenAndAdmin } = require('./verifyToken')

router.post('/', verifyTokenAndAdmin, async (req, res)=>{
    const newCat = new Brand(req.body)

    try {
        const savedCat = await newCat.save()
        res.status(200).json(savedCat)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedCat = await Brand.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedCat)
    } catch (e) {
        res.status(500).json(e);
    }
})

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Brand.findByIdAndDelete(req.params.id)
        res.status(200).json('Brand has been deleted')
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find/:id', async (req, res) => {
    try {
        const cat = await Brand.findById(req.params.id)
        res.status(200).json(cat)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find', async (req, res) => {
    try{
        const Cat = await Brand.find();
        res.status(200).json(Cat)
    } catch (e) {
        res.status(500).json(e)
    }
})


module.exports = router