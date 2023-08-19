//import mongoose librery
const mongoose = require("mongoose")
//add model of shema using mongoose.Schema
const personSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  adress : String,
  favoriteFoods :{type:[String], required :true}
})
//export model
const Person = mongoose.model("person", personSchema)
module.exports=Person