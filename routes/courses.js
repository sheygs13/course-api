  import express from 'express';
  import Joi from '@hapi/joi';
  const router = express.Router();
  import courses from '../db/testData';


router.get('/', (req,res) => {
 res.send(courses);
});


router.get('/:id', (req,res) => {
   const { id } = req.params;
   const course = courses.find(course => course.id === parseInt(id));
   if (!course) return res.status(404).json({message: 'Course with given ID Not Found!'}) 
   res.send(course);
});

router.post('/', (req,res) => {
  const { name } = req.body;
   const { error } = validateCourse({ name });
  if (error) return res.status(400).send(error['details'][0].message) 
   const course = {
     id: courses.length + 1,
     name
   };
   courses.push(course);
   res.status(201).send(course);
});


router.put('/:id', (req,res) => {
  const { id } = req.params;
  const { name } = req.body;
  const course = courses.find(course => course.id === parseInt(id));
  if (!course) return res.status(404).json({ message:'Course with the given ID not found' }) 
  const { error } = validateCourse({ name });
  if (error){ return res.status(400).send(error['details'][0].message) }
  course.name = name;
  res.send(course);
});

router.delete('/:id', (req,res) => {
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

export default router;