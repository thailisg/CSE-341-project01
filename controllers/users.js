const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

//function to get all contacts
const getAll = async (req, res) => {
    console.log("ENTRÉ A GET ALL");
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(contacts)
    });
}

//function to get a single contact
const getSingle = async (req, res) => {
    console.log("ENTRÉ A GET SINGLE");
    console.log("ID:", req.params.id);
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({_id: contactId});
    result.toArray().then((contacts) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(contacts[0])
    });
}

//function to create a new contact
const createContact = async (req, res) => {
    console.log("ENTRÉ A CREAR NUEVO CONTACTO");
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }

    const result = await mongodb
        .getDatabase()
        .db()
        .collection('contacts')
        .insertOne(contact);

    res.status(200).json({
        message: 'Contact created successfully',
        contactId: result.insertedId
    });

}

//Function to Update a single Contact
const updateSingleContact = async (req, res) => {
    console.log("ENTRÉ A UPDATE SINGLE");
    console.log("ID:", req.params.id);
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }

    const result = await mongodb
        .getDatabase()
        .db()
        .collection('contacts')
        .replaceOne({ _id: contactId }, contact);

    if (result.modifiedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(result.error || "Some error ocurred while updating contact")
    }
}

//Function to Delete a single contact
const deleteContact = async (req, res) => {
    console.log("ENTRÉ A DELETE SINGLE");
    console.log("ID:", req.params.id);
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('contacts')
        .deleteOne({ _id: contactId });

    if (result.deletedCount === 1) {
        res.status(200).send();
    } else {
        res.status(500).json(result.error || "Some error ocurred while Deleting contact")
    }

}

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateSingleContact,
    deleteContact
};