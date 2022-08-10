const router = require('express').Router()
const Items = require('../models/Items')
const { verifyToken, verifyTokenAndAuthor, verifyTokenAndAdmin } = require('./verifyToken')

router.post('/add', verifyTokenAndAdmin, async (req, res)=>{
    const newItem = new Items(req.body)

    try {
        const savedItem = await newItem.save()
        res.status(200).json(savedItem)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedItem = await Items.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedItem)
    } catch (e) {
        res.status(500).json(e);
    }
})

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Items.findByIdAndDelete(req.params.id)
        res.status(200).json('Item has been deleted')
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find/:id', async (req, res) => {
    try {
        const item = await Items.findById(req.params.id)
        res.status(200).json(item)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find', async (req, res) => {

    const qNew = req.query.new
    const qCategory = req.query.category
    const qBrand = req.query.brand

    try {
        let items

        if(qNew){
            items = await Items.find().sort({createdAt: -1}).limit(50)
        } else if(qCategory) {
            items = await Items.find({category: {
                $in: [qCategory],
            }})
        } else if(qBrand) {
            items = await Items.find({brand: {
                $in: [qBrand],
            }})
        } else {
            items = await Items.find();
        }
        
        res.status(200).json(items)
    } catch (e) {
        res.status(500).json(e)
    }
})


module.exports = router