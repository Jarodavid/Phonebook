const mongoose = require('mongoose')
 
const phonebookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    contactNumber:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Phonebook', phonebookSchema)