
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

    res.status(200).json({message: `Get contact with id ${req.params.id}`});
}
)

// @desc Update contact by id
// @route PUT /api/contacts/:id
// @access Public
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update contact with id ${req.params.id}`});
}
)

// @desc Delete contact by id
// @route DELETE /api/contacts/:id
// @access Public
const deleteContact =asyncHandler( async (req, res) => {
    res.status(200).json({message: `Delete contact with id ${req.params.id}`});
}
)

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};