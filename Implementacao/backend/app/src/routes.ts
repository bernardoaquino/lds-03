import { TransacaoController } from './controllers/TransacaoController';
import { DepartamentoController } from './controllers/DepartamentoController';
import { EmpresaController } from './controllers/EmpresaController';
import { Router } from 'express'
import { AuthController } from './controllers/AuthController';
import { AlunoController } from './controllers/AlunoController';
import { CursoController } from './controllers/CursoController';
import { InstituicaoDeEnsinoController } from './controllers/InstituicaoDeEnsinoController';

/** Middlewares */
import { authMiddleware } from './middlewares/authMiddleware';

/** Controllers */
import BusinessController from './controllers/BusinessController';
import CourseController from './controllers/CourseController';
import DepartmentController from './controllers/DepartmentController';
import InstituteController from './controllers/InstituteController';
import ProfessorController from './controllers/ProfessorController';
import StudentController from './controllers/StudentController';
import TransferController from './controllers/TransferController';
import AdvantageController from './controllers/AdvantageController';

const routes = Router()

routes.post('/login', new AuthController().login)

/** Business routes */
routes.post('/business', BusinessController.create);
routes.put('/business', authMiddleware, BusinessController.update);
routes.delete('/business', authMiddleware, BusinessController.delete);

/** Advantage routes */
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
routes.get('/course/:id', authMiddleware, CourseController.listAll);
routes.post('/course', authMiddleware, CourseController.create);
routes.put('/course/:id', authMiddleware, CourseController.update);
routes.delete('/course/:id', authMiddleware, CourseController.delete);

/** Professor routes */
routes.post('/professor', ProfessorController.create);
routes.put('/professor', authMiddleware, ProfessorController.update);
routes.delete('/professor', authMiddleware, ProfessorController.delete);

/** Student routes */
routes.post('/student', StudentController.create);
routes.put('/student', authMiddleware, StudentController.update);
routes.delete('/student', authMiddleware, StudentController.delete);
routes.post('/student/advantage', authMiddleware, StudentController.acquireAdvantage);

/** Transfer routes */
routes.get('/transfer', authMiddleware, TransferController.list);
routes.post('/transfer', authMiddleware, TransferController.create);








routes.get('/institution/all', new InstituicaoDeEnsinoController().list)
routes.get('/instituicao/:id', new InstituicaoDeEnsinoController().listOne)
routes.post('/institution', new InstituicaoDeEnsinoController().create)
routes.put('/instituicao/:id', new InstituicaoDeEnsinoController().update)
routes.delete('/instituicao/:id', new InstituicaoDeEnsinoController().destroy)

routes.get('/empresa', new EmpresaController().list)
routes.get('/empresa/:id', new EmpresaController().listOne)
routes.post('/empresa', new EmpresaController().create)
//routes.put('/empresa/:id', new EmpresaController().update)
routes.delete('/empresa/:id', new EmpresaController().destroy)

routes.get('/curso', new CursoController().list)
routes.get('/curso/:id', new CursoController().listOne)
routes.post('/curso', new CursoController().create)
routes.put('/curso/:id', new CursoController().update)
routes.delete('/curso/:id', new CursoController().destroy)

routes.get('/aluno', new AlunoController().list)
routes.get('/aluno/:id', new AlunoController().listOne)
routes.post('/aluno', new AlunoController().create)
//routes.put('/aluno/:id', new AlunoController().update)
routes.delete('/aluno/:id', new AlunoController().destroy)

routes.get('/departamento', new DepartamentoController().list)
routes.get('/departamento/:id', new DepartamentoController().listOne)
routes.get('/departamento/instituicao/:id', new DepartamentoController().listByInstituicao)
routes.post('/departamento', new DepartamentoController().create)
routes.put('/departamento/:id', new DepartamentoController().update)
routes.delete('/departamento/:id', new DepartamentoController().destroy)

// routes.get('/professor', new ProfessorController().list)
// routes.get('/professor/:id', new ProfessorController().listOne)
// routes.post('/professor', new ProfessorController().create)
// routes.delete('/professor/:id', new ProfessorController().delete)

routes.use(authMiddleware)

// routes.put('/professor', new ProfessorController().update)

// routes.get('/perfil/aluno', new AlunoController().getProfile)
// routes.get('/perfil/empresa', new EmpresaController().getProfile)
// routes.get('/perfil/instituicao', new InstituicaoDeEnsinoController().getProfile)
// routes.get('/perfil/professor', new ProfessorController().getProfile)
// routes.put('/aluno/:id', new AlunoController().update)
// routes.put('/empresa/:id', new EmpresaController().update)
// // routes.put('/professor/:id', new ProfessorController().update)

// routes.post('/transacao', new TransacaoController().create)
// routes.get('/transacao', new TransacaoController().list)
// routes.get('/transacao/:id', new TransacaoController().listOne)

export default routes