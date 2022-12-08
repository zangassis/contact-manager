import mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel.js";

const Contact = mongoose.model('Contact', ContactSchema);

export const getContacts = (req, res) => {
    Contact.find({}, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};

export const getContactById = (req, res) => {
    Contact.findById(req.params.contactId, (err, contact) => {
        if (!contact) {
            res.statusCode = 404;
            res.send({ error: 'Not found' });
        }
        res.json(contact);
    });
};

export const addNewContact = (req, res) => {
    let newContact = new Contact(req.body);

    newContact.save((err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};

export const updateContact = (req, res) => {
    Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
        if (!contact) {
            res.statusCode = 404;
            res.send({ error: 'Not found' });
        }
        res.json(contact);
    });
};

export const deleteContact = (req, res) => {

    Contact.findByIdAndDelete({ _id: req.params.contactId }, (err, contact) => {
        if (!contact) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return res.json({ message: 'Successfully deleted contact' });
    });
};