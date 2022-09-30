const router = require('express').Router()
const Order = require('../models/Order')
const { verifyToken, verifyTokenAndAuthor, verifyTokenAndAdmin } = require('./verifyToken')

router.post('/',  async (req, res) => {
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedOrder)
    } catch (e) {
        res.status(500).json(e);
    }
})

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json('Order has been deleted')
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/find/:userName', async (req, res) => {
    const qNew = req.query.new
    try {
        let orders
        if(qNew){
            orders = await Order.find({ userName: req.params.userName }).sort({createdAt: -1}).limit(10)
        }else{
            orders = await Order.find({ userName: req.params.userName })
        }
        res.status(200).json(orders)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        res.status(200).json(order)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/', async (req, res) => {
    const qNew = req.query.new
    try {
        let orders

        if(qNew){
            orders = await Order.find().sort({createdAt: -1}).limit(10)
        }else{
            orders = await Order.find()
        }
        
        res.status(200).json(orders)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
    try {

        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: { month: { $month: '$createdAt' },
                            sales:  '$amount',  },
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: '$sales' },
                }
            }
        ])
        res.status(200).json(income)
    } catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router