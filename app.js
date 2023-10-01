const express = require("express")
const dbConn = require("./config/dbConn")
const personSchema = require("./Modeles/person")
const person = require("./Modeles/person")


//defifine port number & express module
const app = express()
const port = 5000

// use json to be able to read json file
app.use(express.json())

dbConn()

app.get('/', async (req, res) => {

  const person = await personSchema.find()
  res.status(200).send(person);
})
  

app.post('/addPerson', async (req, res) => {
  try {
    const newperson = new personSchema(req.body)
    await newperson.save();
    res.status(200).send("Person created successfully")
  }
  catch (error) {
    res.status(500).send("unable to add new person")
    console.log(error)
  }
})

app.get('/getPerson', async (req, res) => {

  const person = await personSchema.find()
  res.status(200).send(person);
})

app.get('/getPersonById/:id', async (req, res) => {
  try {
    const { _id } = req.params;
    const person = await personSchema.findById(_id)
    person
      ? res.status(200).send(person) :
      res.status(404).send("cannot not found")
  }
  catch {
    res.status(500).send("cannot get person")
    console.log(error)
  }
})
// update from DB by Field
app.put('/UpdatePersonByName/:name', (req, res) => {
  try {
    const { name } = req.params
    personSchema.findOneAndUpdate(
      {
        name: name  // search query
      },
      {
        ...req.body  // field:values to update
      },
      {
        new: true,                       // return updated doc
        runValidators: true              // validate before update
      })
      .then(doc => {
        console.log(doc)
        res.send({ result: "user updated", newuser: doc })
      })
      .catch(err => {
        console.error(err)
      })

  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }

})

// update from DB by ID
app.put('/UpdatePersonById/:id', (req, res) => {
  try {
    const { id } = req.params
    personSchema.findByIdAndUpdate(

      id,  // search query

      {
        $set: {
          ...req.body  // field:values to update
        }
      }
      ,
      {
       // overwrite : true, to remplace all document
        new: true,                       // return updated doc
        runValidators: true              // validate before update
      })
      .then(doc => {
        console.log(doc)
        res.send({ result: "user updated", newuser: doc })
      })
      .catch(err => {
        console.error(err)
      })

  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }

})

// delete from DB by field

app.delete('/DeletePersonbyName/:name', function (req, res) {
  const { name } = req.params

  personSchema.findOneAndRemove({
    name: name
  })
    .then(response => {
      res.status(200).send("user delete")
      console.log(response)
    })
    .catch(err => {
      console.error(err)
      res.status(400).send("error delete")

    })

});

//
// delete from DB by ID

app.delete('/DeletePersonbyId/:id', function (req, res) {
  const { id } = req.params

  personSchema.findByIdAndDelete(id)
    .then(response => {
      res.status(200).send("user delete")
      console.log(response)
    })
    .catch(err => {
      console.error(err)
      res.status(400).send("error delete")

    })

});

// start server
app.listen(port, (err) => {

  if (err) {
    console.log("error in server:", err);
  }
  else {

    console.log(`server is running on .. http://localhost:${port}`);

  }
}
)

