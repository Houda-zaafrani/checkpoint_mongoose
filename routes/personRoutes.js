//import express librery
const express = require("express");
//create new router object
const router = express.Router();
//import personSchema
const Person = require("../models/personSchema");

//Create and Save a Record of a Model

router.post("/persons", async (req, res) => {
  try {
    const newPerson = await new Person(req.body);
    await newPerson.save();
    res.status(201).json({ msg: "new person added with success", newPerson });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Create Many Records with model.create()**ok**

router.post("/persons", async (req, res) => {
  try {
    const arrayOfpeaple = await Person.create(req.body);
    res.status(201).json({ msg: "all peaple added with success", arrayOfpeaple });
  } catch (err) {res.status(500).json({ msg: err.message })}
});
 
//Find all the people having a given name 

router.get("/persons/:name",async(req,res)=>{
    try{
     const person = await Person.find({name : "anis"})
    res.status(200).json({msg : `all persons who have name **${req.params.name}** are :`,person})
    if(!person) return res.status(404).json({msg : "person with requested name not found"})
    }catch(err){res.status(500).json({msg: err.Message})}
});

//Use model.findOne() to Return a Single Matching Document from Your Database 

router.get("/persons/:favoriteFoods", async (req, res) => {
  try {
    const person = await Person.findOne({favoriteFoods : "plat01"});
    if (!person)
      return res
        .status(404)
        .json({ msg: "person how have requested favoriteFoods not found" });
    res
      .status(200)
      .json({
        msg: `requested persen with favoriteFood is ${req.params.favoriteFoods}:`,person,
      });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
 
// Use model.findById() to Sea:rch Your Database By _id
router.get("/persons/:id", async(req,res)=> {
  try{
  const person = await Person.findById(req.params.id)
  if(!person) return res.status(404).json({msg : "your request person not found"})
  res.status(200).json({msg : "your requested person is :",person})
  }catch(err){res.status(500).json({msg : err.message})}
})

//Perform Classic Updates by Running Find, Edit, then Save

 router.put("/persons/:id", async (req, res) => {
   try {
     const person = await Person.findOne({_id :req.params.id });

      person.favoriteFoods.push("humberger");
      await person.save()

     if (!person) return res.status(404).json({ msg: "contact not found" });
     res
       .status(200)
       .json({msg: "person updated with success",
         contact: { ...person._doc, ...req.body },
      });
  } catch (err) {
    res.status(500).json({ msg: err.message });
   }
 });

//Perform New Updates on a Document Using model.findOneAndUpdate()

router.put("/persons/:name", async (req, res) => {
  try {
    const person = await Person.findOneAndUpdate(
      { name: req.params.name },
      { age: 10 },
      { new: true }
    );
    if (!person) return res.status(404).json({ msg: "person not found" });
    res.status(200).json({ ...person._doc, ...req.body });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Delete One Document Using model.findByIdAndRemove

router.delete("/persons/:id",async(req,res)=>{
  try{
    const person = await Person.findByIdAndRemove(req.params.id)
    if(!person) return res.status(404).json({msg : "contact not found"})
    res.status(200).json({msg : `person who has id :${req.params.id} deleted with success`,person})
  }catch(err){res.status(500).json({msg : err.message})}
})

//MongoDB and Mongoose - Delete Many Documents with model.remove()*not ok*

router.delete("/persons", async (req, res) => {
  const nameToDelete = "anis";
  try {
    const resultat = await Person.deleteMany({ name: nameToDelete })
      // .then((deleteCount) => (deleteCount = resultat.n))
      // .json(deleteCount);
    if (!resultat) return res.status(404).json({ msg: "contact not found" });
    res
      .status(200)
      .json({ msg: `number of deleted documents who has name ${nameToDelete} is/are :`, resultat });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Chain Search Query Helpers to Narrow Search Results*not ok*
router.get("/user", async (req, res) => {
  // find all users
  Person.find({ favoriteFoods: "burritos" })
    //sort ascending by firstName
    .sort({ name: 1 }) //Sort by name
    .limit(2) //Limit results to 2 documents
    .select(-age) // Hide their age
    .then((resultat) => {
      res.status(200).json({ msg: "list of result :", resultat });
    })
    .catch((err) => {
      res.status(500).json({ msg: err.message });
    });
});

module.exports = router;
