
const asyncHandler = require('express-async-handler');
// asyncHandler is a middleware that wraps an async route handler function and catches any errors that occur during the execution of the function.
const Contact = require('../models/contactModel');

// @desc Get all contacts
// @route GET /api/contacts
// @access Public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
})

// @desc Create new contact
// @route POST /api/contacts
// @access Public
const createContact = asyncHandler( async (req, res) => {
    console.log("the request body is: ", req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error('Please enter all fields');
    }
    const contact = new Contact({
        name,
        email,
        phone
    });
    await contact.save();
    res.status(201).json(contact);
}
)

// @desc Get contact by id
// @route GET /api/contacts/:id
// @access Public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    res.status(200).json(contact);
}
)

// @desc Update contact by id
// @route PUT /api/contacts/:id
// @access Public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    const {name, email, phone} = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, {
        name,
        email,
        phone
    }, {new: true}); // {new: true} is used to return the updated document instead of the original document
    res.status(200).json(updateContact);
}
)

// @desc Delete contact by id
// @route DELETE /api/contacts/:id
// @access Public
const deleteContact = asyncHandler(async (req, res) => {
    console.log(`Attempting to delete contact with ID: ${req.params.id}`);
    const contact = await Contact.findById(req.params.id);
    console.log(`Contact found: ${contact}`);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Contact removed', contact });
});

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};