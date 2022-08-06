const router = require('express').Router()
const BrandsIcon = require('../models/BrandsIcon')
const { verifyToken, verifyTokenAndAuthor, verifyTokenAndAdmin } = require('./verifyToken')

router.post('/', verifyTokenAndAdmin, async (req, res)=>{
    const newBI = new BrandsIcon(req.body)

    try {
        const savedBI = await newBI.save()
        res.status(200).json(savedBI)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedCat = await BrandsIcon.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedCat)
    } catch (e) {
        res.status(500).json(e);
    }
})

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await BrandsIcon.findByIdAndDelete(req.params.id)
        res.status(200).json('Category has been deleted')
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find/:id', async (req, res) => {
    try {
        const cat = await BrandsIcon.findById(req.params.id)
        res.status(200).json(cat)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find', async (req, res) => {
    try{
        const Cat = await BrandsIcon.find();
        res.status(200).json(Cat)
    } catch (e) {
        res.status(500).json(e)
    }
})


module.exports = router