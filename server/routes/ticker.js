const express = require('express');
const router = express.Router();

const { Ticker } = require('../models/tickets');


router.get('/',async(req,res)=>{
    try {
        const tickersData= await Ticker.find({}).limit(10).lean();
        res.status(200).json(tickersData);
    } catch (error) {
        console.log(error);
    res.status(500).json({ message: error.message });
    }
})

router.get('/:base_unit',async(req,res)=>{
    try {
        const { base_unit }=req.params
        const tickersData= await Ticker.find({base_unit:base_unit});
        res.status(200).json(tickersData);
    } catch (error) {
        console.log(error);
    res.status(500).json({ message: error.message });
    }
})

module.exports = router;
