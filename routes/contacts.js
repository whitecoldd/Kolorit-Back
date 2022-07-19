const router = require('express').Router()
const Contacts = require('../models/Contacts')
const { verifyToken, verifyTokenAndAuthor, verifyTokenAndAdmin } = require('./verifyToken')

router.post('/', verifyTokenAndAdmin, async (req, res)=>{
    const newCon = new Contacts(req.body)

    try {
        const savedCon = await newCon.save()
        res.status(200).json(savedCon)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedCon = await Contacts.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedCon)
    } catch (e) {
        res.status(500).json(e);
    }
})

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Contacts.findByIdAndDelete(req.params.id)
        res.status(200).json('Contact has been deleted')
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find/:id', async (req, res) => {
    try {
        const con = await Contacts.findById(req.params.id)
        res.status(200).json(con)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find', async (req, res) => {
    try{
        const Con = await Contacts.find();
        res.status(200).json(Con)
    } catch (e) {
        res.status(500).json(e)
    }
})


module.exports = router