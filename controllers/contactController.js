const asyncHandler=require('express-async-handler');
const Contact=require("../models/contactSchema");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts=asyncHandler(async (req, res) => {
    const contacts=await Contact.find({user_id:req.user_id});
    res.status(200).json(contacts);
  });


//@desc Create a new contact
//@route POST /api/contacts
//@access private
  const createContact=asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name,email,phone}=req.body;
    if(!name|| !email || !phone){
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const contact=await Contact.create({
      name,email,phone,
      user_id:req.user.id
    });
    res.status(201).json(contact);
  });


//@desc Get a contact
//@route GET /api/contacts/:id
//@access private
const getContact=asyncHandler(async (req, res) => {
  const contact= await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not Found");
  }
  res.status(200).json(contact);
});

//@desc Put a contact
//@route PUT /api/contacts/:id
//@access private


  const updateContact= asyncHandler(async (req, res) => {
    const contact= await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not Found");
  }

  if(contact.user_id.toString()!==req.user.id){
    res.status(403);
    throw new Error("Usser dont have permission to update other contacts");
  }

  const updatedContact=await Contact.findById(
    req.params.id,
    req.body,
    {new:true}
  );
  res.status(200).json(updatedContact);
  });


//@desc Delete a contact
//@route Delete /api/contacts/:id
//@access private

  const deleteContact= asyncHandler(async (req, res) => {
    const contact= await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not Found");
  }
  if(contact.user_id.toString()!==req.user.id){
    res.status(403);
    throw new Error("Usser dont have permission to update other contacts");
  }

  await Contact.deleteOne({_id:req.params.id});
  res.status(200).json(contact);
});

  module.exports={getContacts,getContact,createContact,updateContact,deleteContact};