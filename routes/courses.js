import express from 'express';
import courseController from '../controllers/courseController';
const router = express.Router();


router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getOneCourse);
router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);


export default router;