const express = require('express');
const router = require('express').Router();
const db = require('../../models/index');
const { handleUpDelRes } = require('./utils/utils.js');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
    try {
        await db.Comment.create(req.body);
        res.status(201).json({});
    } catch (err) {
        console.log("FAIL create a comemnt");
        res.status(500).send(err);
    }
});

router.delete('/byid/:id', async (req, res) => {
    try {
        await handleUpDelRes(db.Comment.findByIdAndDelete(req.params.id), res);
    } catch (err) {
        res.status(500).send(err);
    }
})
   
module.exports = router;

