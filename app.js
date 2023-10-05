const express = require("express")
const dbConn = require("./config/dbConn")
const moviesSchema = require("./Modeles/movie")
const movie = require("./Modeles/movie")
var cors = require('cors')

require('dotenv').config()



//defifine port number & express module
const app = express()
const port = process.env.PORT

// use json to be able to read json file
app.use(express.json())
app.use(cors())


dbConn()

app.get('/', async (req, res) => {

  const person = await moviesSchema.find()
  res.status(200).send(person);
})
  

app.post('/addMovie', async (req, res) => {
  try {
    const newmovie = new moviesSchema(req.body)
    const response =await newmovie.save();
    res.status(200).send(response)
  }
  catch (error) {
    res.status(500).send("unable to add new Movie")
    console.log(error)
  }
})

app.get('/getMovies', async (req, res) => {

  const movie = await moviesSchema.find()
  res.status(200).send(movie);
})

app.get('/getMovieById/:id', async (req, res) => {
  try {
    const { _id } = req.params;
    const movie = await moviesSchema.findById(_id)
    movie
      ? res.status(200).send(movie) :
      res.status(404).send("cannot not found")
  }
  catch {
    res.status(500).send("cannot get Movies")
    console.log(error)
  }
})
// update from DB by Field
app.put('/UpdateMovieByName/:name', (req, res) => {
  try {
    const { name } = req.params
    moviesSchema.findOneAndUpdate(
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
        res.send({ result: "Movie updated", newuser: doc })
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
app.put('/UpdateMovieById/:id', (req, res) => {
  try {
    const { id } = req.params
    moviesSchema.findByIdAndUpdate(

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
        res.send({ result: "Movie updated", newuser: doc })
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

app.delete('/DeleteMoviebyTitle/:name', function (req, res) {
  const { name } = req.params

  moviesSchema.findOneAndRemove({
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

app.delete('/DeleteMoviebyId/:id', function (req, res) {
  const {id} = req.params
console.log(id);
  moviesSchema.findByIdAndDelete(id)
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

