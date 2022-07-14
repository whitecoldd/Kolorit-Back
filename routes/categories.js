const router = require('express').Router()
const Categories = require('../models/Categories')
const { verifyToken, verifyTokenAndAuthor, verifyTokenAndAdmin } = require('./verifyToken')

router.post('/add', verifyTokenAndAdmin, async (req, res)=>{
    const newCat = new Categories(req.body)

    try {
        const savedCat = await newCat.save()
        res.status(200).json(savedCat)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedCat = await Categories.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedCat)
    } catch (e) {
        res.status(500).json(e);
    }
})

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Categories.findByIdAndDelete(req.params.id)
        res.status(200).json('Category has been deleted')
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find/:id', async (req, res) => {
    try {
        const cat = await Categories.findById(req.params.id)
        res.status(200).json(cat)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find', async (req, res) => {
    try{
        const Categories = await Categories.find();
        res.status(200).json(Categories)
    } catch (e) {
        res.status(500).json(e)
    }
})


module.exports = router