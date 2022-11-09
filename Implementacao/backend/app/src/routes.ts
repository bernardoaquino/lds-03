import { TransacaoController } from './controllers/TransacaoController';
import { DepartamentoController } from './controllers/DepartamentoController';
import { EmpresaController } from './controllers/EmpresaController';
import { Router } from 'express'
import { AuthController } from './controllers/AuthController';
import { AlunoController } from './controllers/AlunoController';
import { CursoController } from './controllers/CursoController';
import { InstituicaoDeEnsinoController } from './controllers/InstituicaoDeEnsinoController';
import { authMiddleware } from './middlewares/authMiddleware';
import { ProfessorController } from './controllers/ProfessorController';

const routes = Router()

routes.post('/login', new AuthController().login)

routes.get('/instituicao', new InstituicaoDeEnsinoController().list)
routes.get('/instituicao/:id', new InstituicaoDeEnsinoController().listOne)
routes.post('/instituicao', new InstituicaoDeEnsinoController().create)
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
routes.post('/departamento', new DepartamentoController().create)
routes.put('/departamento/:id', new DepartamentoController().update)
routes.delete('/departamento/:id', new DepartamentoController().destroy)

routes.get('/professor', new ProfessorController().list)
routes.get('/professor/:id', new ProfessorController().listOne)
routes.post('/professor', new ProfessorController().create)
// routes.put('/professor/:id', new ProfessorController().update)
routes.delete('/professor/:id', new ProfessorController().destroy)

routes.use(authMiddleware)

routes.get('/perfil/aluno', new AlunoController().getProfile)
routes.get('/perfil/empresa', new EmpresaController().getProfile)
routes.get('/perfil/instituicao', new InstituicaoDeEnsinoController().getProfile)
routes.get('/perfil/professor', new ProfessorController().getProfile)
routes.put('/aluno/:id', new AlunoController().update)
routes.put('/empresa/:id', new EmpresaController().update)
routes.put('/professor/:id', new ProfessorController().update)

routes.post('/transacao', new TransacaoController().create)
routes.get('/transacao', new TransacaoController().list)
routes.get('/transacao/:id', new TransacaoController().listOne)

export default routes