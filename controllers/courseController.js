import validateCourse from "../utils/handler";
import courses from "../db/data";

const getAllCourses = (req, res) => {
  res.send(courses);
};

const getOneCourse = (req, res) => {
  const { id } = req.params;
  const course = courses.find((course) => course.id === parseInt(id));
  if (!course)
    return res.status(404).json({ message: "Course with given ID Not Found!" });
  res.send(course);
};

const createCourse = (req, res) => {
  const { name } = req.body;
  const { error } = validateCourse({ name });
  if (error) return res.status(400).send(error["details"][0].message);
  const course = {
    id: courses.length + 1,
    name,
  };
  courses.push(course);
  res.status(201).send(course);
};

const updateCourse = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const course = courses.find((course) => course.id === parseInt(id));
  if (!course)
    return res
      .status(404)
      .json({ message: "Course with the given ID not found" });
  const { error } = validateCourse({ name });
  if (error) {
    return res.status(400).send(error["details"][0].message);
  }
  course.name = name;
  res.status(200).send(course);
};

const deleteCourse = (req, res) => {
  const { id } = req.params;
  const index = courses.findIndex((course) => course.id === parseInt(id));
  if (index < 0)
    return res
      .status(404)
      .json({ message: "Course with the given ID not found" });
  courses.splice(index, 1);
  res.status(204).send(courses);
};

export default {
  getAllCourses,
  getOneCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
