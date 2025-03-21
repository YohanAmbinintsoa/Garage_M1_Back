const express = require('express');
const Test = require('../models/Test'); // Import Test model

const router = express.Router();

/**
 * @route   POST /tests
 * @desc    Create a new test user
 */
router.post('/', async (req, res) => {
    try {
        const newTest = new Test(req.body);
        const savedTest = await newTest.save();
        res.status(201).json({data:savedTest});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @route   GET /tests
 * @desc    Get all test users
 */
router.get('/', async (req, res) => {
    try {
        const tests = await Test.find();
        res.status(200).json({data:tests});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @route   GET /tests/:id
 * @desc    Get a single test user by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        if (!test) return res.status(404).json({ message: 'Test user not found' });
        res.status(200).json({data:test});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @route   PUT /tests/:id
 * @desc    Update a test user by ID
 */
router.put('/:id', async (req, res) => {
    try {
        const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTest) return res.status(404).json({ message: 'Test user not found' });
        res.status(200).json({data:updatedTest});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @route   DELETE /tests/:id
 * @desc    Delete a test user by ID
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedTest = await Test.findByIdAndDelete(req.params.id);
        if (!deletedTest) return res.status(404).json({ message: 'Test user not found' });
        res.status(200).json({ message: 'Test user deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
