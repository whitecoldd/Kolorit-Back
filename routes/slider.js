const router = require('express').Router()
const Slider = require('../models/Slider')
const { verifyToken, verifyTokenAndAuthor, verifyTokenAndAdmin } = require('./verifyToken')

router.post('/', verifyTokenAndAdmin, async (req, res)=>{
    const newSlider = new Slider(req.body)

    try {
        const savedSlider = await newSlider.save()
        res.status(200).json(savedSlider)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedSlider = await Slider.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedSlider)
    } catch (e) {
        res.status(500).json(e);
    }
})

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Slider.findByIdAndDelete(req.params.id)
        res.status(200).json('Slider has been deleted')
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find/:id', async (req, res) => {
    try {
        const slider = await Slider.findById(req.params.id)
        res.status(200).json(slider)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find', async (req, res) => {
    try{
        const slider = await Slider.find();
        res.status(200).json(slider)
    } catch (e) {
        res.status(500).json(e)
    }
})


module.exports = router