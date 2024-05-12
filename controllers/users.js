const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const db = mongodb.getDb().db();
        const contacts = await db.collection('contacts').find().toArray(); 

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } catch (err) {
        console.error(`Error: ${err}`);
        
        if (!res.headersSent) {
            res.status(400).json({ message: 'Failed to retrieve contacts' });
        }
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const userId = new ObjectId(req.params.id);
        const db = mongodb.getDb().db();
        const contacts = await db.collection('contacts').find({ _id: userId }).toArray();
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } catch (err) {
        console.error(`Error: ${err}`);
        
        if (!res.headersSent) {
            res.status(400).json({ message: 'Failed to retrieve that contact' });
        }
    }
};


const createContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday

    };
    const result = await mongodb.getDb().db().collection('contacts').insertOne(user);
    if (result.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while inserting the user.')
    };
};

const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: userId }, user);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while updating the user.')
    };
};

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while deleting the user.')
    };

};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};