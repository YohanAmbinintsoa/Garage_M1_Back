const express = require('express');
const CarBrand = require('../models/CarBrand'); 
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { designation } = req.body;
        const newCarBrand = new CarBrand({ designation });
        await newCarBrand.save();
        res.status(201).json(newCarBrand);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la création de la marque', error: err });
    }
});

router.get('/', async (req, res) => {
    try {
        const carBrands = await CarBrand.find();
        res.status(200).json(carBrands);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la récupération des marques', error: err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const carBrand = await CarBrand.findById(req.params.id);
        if (!carBrand) {
            return res.status(404).json({ message: 'Marque non trouvée' });
        }
        res.status(200).json(carBrand);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la récupération de la marque', error: err });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { designation } = req.body;
        const updatedCarBrand = await CarBrand.findByIdAndUpdate(
            req.params.id,
            { designation },
            { new: true }
        );
        if (!updatedCarBrand) {
            return res.status(404).json({ message: 'Marque non trouvée' });
        }
        res.status(200).json(updatedCarBrand);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour de la marque', error: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCarBrand = await CarBrand.findByIdAndDelete(req.params.id);
        if (!deletedCarBrand) {
            return res.status(404).json({ message: 'Marque non trouvée' });
        }
        res.status(200).json({ message: 'Marque supprimée avec succès' });
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la suppression de la marque', error: err });
    }
});

module.exports = router;
