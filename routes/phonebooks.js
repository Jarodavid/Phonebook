const express = require("express");
const router = express.Router();
const Phonebook = require('../model/phonebook');


// Getting all
router.get('/',async(req,res) => {
    try{
        const phonebooks = await Phonebook.find()
        res.json(phonebooks)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})
// Getting one
router.get('/:id',getPhonebook, (req,res) => {
    res.send([res.phonebook.name,res.phonebook.contactNumber])

})
// Creating one
router.post('/', async(req,res) => {
    const phonebook = await new Phonebook({
        name: req.body.name,
        contactNumber: req.body.contactNumber
    })
    try{
        const newPhonebook = await phonebook.save()
        res.status(201).json(newPhonebook)
    }catch(err){
        res.status(400).json({message: err.message})   
    }

})



// Updating one
router.patch('/:id',getPhonebook,async(req,res) => {
    if(req.body.name != null){
        res.phonebook.name = req.body.name
    }
    if(req.body.contactNumber != null){
        res.phonebook.contactNumber = req.body.contactNumber
    }
    try{
        const updatedPhonebook =  await res.phonebook.save()
        res.json(updatedPhonebook)
    }catch(err){
        res.status(400).json({message: err.message})

    }
})

// Deleting one
router.delete('/:id',getPhonebook,async (req,res) => {
    try{
        await res.phonebook.remove()
        res.json({message: 'Deleted Data'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getPhonebook(req, res, next){
    let phonebook
    try{
        phonebook = await Phonebook.findById(req.params.id)
        if(phonebook == null){
        return res.status(404).json({message:'Cannot Find Data'})
        }
    } catch (err){
        return res.status(500).json({message: 'error' })
    } 

    res.phonebook = phonebook 
    next()
}

module.exports = router;