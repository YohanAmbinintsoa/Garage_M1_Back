const express = require('express');
const Car = require('../models/Car');
const CarModel = require('../models/CarModel');
const User = require('../models/User'); // Import User model to check if the owner exists
const router = express.Router();

// 1. Create a new car
router.post('/', async (req, res) => {
    try {
        const { designation, carModel, year } = req.body;

        const owner = req.user.id;

        const modelExist = await CarModel.findById(carModel);
        if (!modelExist) {
            return res.status(404).json({ message: 'Car model not found' });
        }

        const ownerExist = await User.findById(owner);
        if (!ownerExist) {
            return res.status(404).json({ message: 'User (owner) not found' });
        }

        const newCar = new Car({ designation, carModel, year, owner });
        await newCar.save();
        res.status(201).json(newCar);
    } catch (err) {
        res.status(400).json({ message: 'Error creating the car', error: err });
    }
});

// 2. Get all cars with populated carModel and owner
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find().populate('carModel').populate('owner'); // Populate carModel and owner references
        res.status(200).json(cars);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching cars', error: err });
    }
});

router.get('/my-cars', async (req, res) => {
    try {
        const ownerId = req.user.id;
        
        const cars = await Car.find({ owner: ownerId })
            .populate('carModel')
            .populate('owner', '-password'); // Exclude password field from owner data
        
        res.status(200).json(cars);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching your cars', error: err });
    }
});

// 3. Get a car by ID with populated carModel and owner
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id).populate('carModel').populate('owner'); // Populate carModel and owner references
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching the car', error: err });
    }
});

// 4. Update a car by ID
router.put('/:id', async (req, res) => {
    try {
        const { designation, carModel, year, owner } = req.body;

        // Check if the car model exists
        const modelExist = await CarModel.findById(carModel);
        if (!modelExist) {
            return res.status(404).json({ message: 'Car model not found' });
        }

        // Check if the owner exists
        const ownerExist = await User.findById(owner);
        if (!ownerExist) {
            return res.status(404).json({ message: 'User (owner) not found' });
        }

        const updatedCar = await Car.findByIdAndUpdate(
            req.params.id,
            { designation, carModel, year, owner },
            { new: true } // Return the updated car
        );

        if (!updatedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.status(200).json(updatedCar);
    } catch (err) {
        res.status(400).json({ message: 'Error updating the car', error: err });
    }
});

// 5. Delete a car by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        if (!deletedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({ message: 'Car successfully deleted' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting the car', error: err });
    }
});

module.exports = router;
