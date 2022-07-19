const router = require('express').Router()
const Articles = require('../models/Articles')
const { verifyToken, verifyTokenAndAuthor, verifyTokenAndAdmin } = require('./verifyToken')

router.post('/', verifyTokenAndAdmin, async (req, res)=>{
    const newArticles = new Articles(req.body)

    try {
        const savedArticles = await newArticles.save()
        res.status(200).json(savedArticles)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedArticles = await Articles.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedArticles)
    } catch (e) {
        res.status(500).json(e);
    }
})

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Articles.findByIdAndDelete(req.params.id)
        res.status(200).json('Item has been deleted')
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find/:id', async (req, res) => {
    try {
        const ab = await Articles.findById(req.params.id)
        res.status(200).json(ab)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find', async (req, res) => {

    const qNew = req.query.new

    try {
        let arts

        if(qNew){
            arts = await Articles.find().sort({createdAt: -1}).limit(10)
        }  else {
            arts = await Articles.find();
        }
        
        res.status(200).json(arts)
    } catch (e) {
        res.status(500).json(e)
    }
})



module.exports = router