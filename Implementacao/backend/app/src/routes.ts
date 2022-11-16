import { Router } from 'express'

/** Middlewares */
import { authMiddleware } from './middlewares/authMiddleware';

/** Controllers */
import AuthController from './controllers/AuthController';
import BusinessController from './controllers/BusinessController';
import CourseController from './controllers/CourseController';
import DepartmentController from './controllers/DepartmentController';
import InstituteController from './controllers/InstituteController';
import ProfessorController from './controllers/ProfessorController';
import StudentController from './controllers/StudentController';
import TransferController from './controllers/TransferController';
import AdvantageController from './controllers/AdvantageController';

const routes = Router()

routes.post('/login', AuthController.login);

/** Business routes */
routes.post('/business', BusinessController.create);
routes.put('/business', authMiddleware, BusinessController.update);
routes.delete('/business', authMiddleware, BusinessController.delete);

/** Advantage routes */
routes.get('/advantage/business', authMiddleware, AdvantageController.listAllOwnedByBusiness);
routes.get('/advantage/all', authMiddleware, AdvantageController.listAll);
routes.post('/advantage', authMiddleware, AdvantageController.create);
routes.put('/advantage/:id', authMiddleware, AdvantageController.update);
routes.delete('/advantage/:id', authMiddleware, AdvantageController.delete);

/** Institution routes */
routes.get('/institution/all', InstituteController.listAll);
routes.post('/institution', InstituteController.create);
routes.put('/institution', authMiddleware, InstituteController.update);
routes.delete('/institution', authMiddleware, InstituteController.delete);

/** Department routes */
routes.get('/department/:id', DepartmentController.listAll)
routes.post('/department', authMiddleware, DepartmentController.create);
routes.put('/department/:id', authMiddleware, DepartmentController.update);
routes.delete('/department/:id', authMiddleware, DepartmentController.delete);

/** Course routes */
routes.get('/course/:id', CourseController.listAll);
routes.post('/course', authMiddleware, CourseController.create);
routes.put('/course/:id', authMiddleware, CourseController.update);
routes.delete('/course/:id', authMiddleware, CourseController.delete);

/** Professor routes */
routes.post('/professor', ProfessorController.create);
routes.put('/professor', authMiddleware, ProfessorController.update);
routes.delete('/professor', authMiddleware, ProfessorController.delete);

/** Student routes */
routes.get('/student', authMiddleware, StudentController.listAll);
routes.post('/student', StudentController.create);
routes.put('/student', authMiddleware, StudentController.update);
routes.delete('/student', authMiddleware, StudentController.delete);
routes.post('/student/advantage', authMiddleware, StudentController.acquireAdvantage);

/** Transfer routes */
routes.get('/transfer', authMiddleware, TransferController.list);
routes.post('/transfer', authMiddleware, TransferController.create);

export default routes