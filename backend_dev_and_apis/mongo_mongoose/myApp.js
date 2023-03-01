let mongoose = require('mongoose')

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


let personSchema = new mongoose.Schema ({
  name : {type: String, required: true},
  age : Number,
  favoriteFoods : [String]
})

let Person = mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {
  let p = new Person({
    name: "Tim Tam",
    age: 69,
    favoriteFoods: ["apple", "kiwi", "cherry"]
  })
  // new_object.save(callback)
  p.save(function(err, data) {
    if (err) return console.log(err)
    done(null, data);
  })
};

var arrayOfPeople = [
  {name: "Tim Tam", age: 93, favoriteFoods: ["apple", "orange"]},
  {name: "Hal Fas", age: 93, favoriteFoods: ["kiwi", "banana"]},
  {name: "Schm Guta", age: 93, favoriteFoods: ["persimmon", "tree"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  // Model.create(array of objs, callback)
  Person.create(arrayOfPeople, function(err, data) {
    // if (err) return console.log(err) why this no work!!??!!
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  // returns all instances of the search term. i.e. returns an array
  // Model.find(search condition, callback)
  Person.find({name: personName}, function(err, data) {
    done(null, data);
  })
};


const findOneByFood = (food, done) => {
  // similar to Model.find() but returns only one document instead of entire array
  // Model.findOne(search, callback)
  Person.findOne({favoriteFoods: food}, function(err, data) {
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  // id auto-generated for each document and this searches those specific ids
  // Model.findById(id, callback)
  Person.findById(personId, function(err, data) {
    if (err) return console.log(err);
    done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person) {
    if (err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, data) {
      if (err) return console.log(err);
      done(null, data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  // Model.findOneAndUpdate({search term}, {update}, {new: true}, callback)
  // this returns a new document object thing
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedPer) => {
    if (err) return console.log(err);
    done(null, updatedPer)
  }) // have to set new: true to say it a WHYYYY
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, function(err, removedPer) {
    if (err) return console.log(err);
    done(null, removedPer)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, result) {
    if (err) return console.log(err)
    done(null, result)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1}) // Model.sort({ var: 1/-1}) 1 for acending, -1 for descending
    .limit(2) // limit resulting array to certain number of documents
    .select({age: 0}) // hide a certain variable from all results. {var name: 0} [NOTE: set number to 1 if want to show]
    .exec(function(err, data) { // execute the chain of commands
      // if (err) return console.log; WHY THIS BREAKING TOO??!!??!
      done(null, data)
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
