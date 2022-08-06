const router = require('express').Router()
const About = require('../models/About')
const { verifyToken, verifyTokenAndAuthor, verifyTokenAndAdmin } = require('./verifyToken')

router.post('/', verifyTokenAndAdmin, async (req, res)=>{
    const newAbout = new About(req.body)

    try {
        const savedAbout = await newAbout.save()
        res.status(200).json(savedAbout)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedAbout = await About.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedAbout)
    } catch (e) {
        res.status(500).json(e);
    }
})

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await About.findByIdAndDelete(req.params.id)
        res.status(200).json('Item has been deleted')
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find/:id', async (req, res) => {
    try {
        const ab = await About.findById(req.params.id)
        res.status(200).json(ab)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find', async (req, res) => {

    const qNew = req.query.new

    try {
        let about

        if(qNew){
            about = await About.find().sort({createdAt: -1}).limit(50)
        }  else {
            about = await About.find();
        }
        
        res.status(200).json(about)
    } catch (e) {
        res.status(500).json(e)
    }
})



module.exports = router