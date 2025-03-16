const express = require('express');
const CarModel = require('../models/CarModel');
const CarBrand = require('../models/CarBrand'); 
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { brand, designation } = req.body;
        
        const brandExist = await CarBrand.findById(brand);
        if (!brandExist) {
            return res.status(404).json({ message: 'Marque non trouvée' });
        }

        const newCarModel = new CarModel({ brand, designation });
        await newCarModel.save();
        res.status(201).json(newCarModel);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la création du modèle', error: err });
    }
});


router.get('/', async (req, res) => {
    try {
        const carModels = await CarModel.find().populate('brand'); // Remplir les données de la marque
        res.status(200).json(carModels);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la récupération des modèles', error: err });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const carModel = await CarModel.findById(req.params.id).populate('brand');
        if (!carModel) {
            return res.status(404).json({ message: 'Modèle non trouvé' });
        }
        res.status(200).json(carModel);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la récupération du modèle', error: err });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { brand, designation } = req.body;

        const brandExist = await CarBrand.findById(brand);
        if (!brandExist) {
            return res.status(404).json({ message: 'Marque non trouvée' });
        }

        const updatedCarModel = await CarModel.findByIdAndUpdate(
            req.params.id,
            { brand, designation },
            { new: true }
        );
        if (!updatedCarModel) {
            return res.status(404).json({ message: 'Modèle non trouvé' });
        }
        res.status(200).json(updatedCarModel);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du modèle', error: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCarModel = await CarModel.findByIdAndDelete(req.params.id);
        if (!deletedCarModel) {
            return res.status(404).json({ message: 'Modèle non trouvé' });
        }
        res.status(200).json({ message: 'Modèle supprimé avec succès' });
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la suppression du modèle', error: err });
    }
});

module.exports = router;
