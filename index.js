const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

// to parse the POST request body to json
app.use(express.json());

const courses = [
  {
   id: 1,
   name: 'Physics'
  },
  {
   id: 2,
   name: 'Algorithms'
  },
  {
   id: 3,
   name: 'Fuzzy Logic'
  }
]

// get request from the root route
app.get('/', (req,res) => {
  res.send('My first express app');
});

app.get('/api/courses', (req,res) => {
 res.send(courses);
});


app.get('/api/courses/:id', (req,res) => {
   const { id } = req.params;
   const course = courses.find(course => course.id === parseInt(id));
   if (!course) return res.status(404).json({message: 'Course with given ID Not Found!'}) 
   res.send(course);
});

app.post('/api/courses', (req,res) => {
  const { name } = req.body;
   // validate the course
   const { error } = validateCourse({ name });

  if (error) return res.status(400).send(error['details'][0].message) 
   const course = {
     id: courses.length + 1,
     name
   };
   courses.push(course);
   res.status(201).send(course);
});


app.put('/api/courses/:id', (req,res) => {
  const { id } = req.params;
  const { name } = req.body;

  // look up the course
  const course = courses.find(course => course.id === parseInt(id));

  // if not existing, return 404 -not found
  if (!course) return res.status(404).json({ message:'Course with the given ID not found' }) 

  // validate the course
  const { error } = validateCourse({ name });

   // if invalid return 400 - bad request
  if (error){ return res.status(400).send(error['details'][0].message) }

  // update the course & return the update course
  course.name = name;
  res.send(course);
});

app.delete('/api/courses/:id', (req,res) => {
    const { id } = req.params;
    const index = courses.findIndex(course => course.id === parseInt(id));
    if (index < 0) return res.status(404).json({ message:'Course with the given ID not found' }) 
    courses.splice(index, 1);
    res.status(204).send(courses);
});

function validateCourse(course){
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  })
  return schema.validate(course);
}

// set port environment variable
const port = process.env.PORT || 4000;

// listen at port for the sender
app.listen(port, () => console.log(`Listening on port ${port}...`));