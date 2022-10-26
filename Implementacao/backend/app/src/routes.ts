import { EmpresaController } from './controllers/EmpresaController';
import { Router } from 'express'
import { AuthController } from './controllers/AuthController';
import { AlunoController } from './controllers/AlunoController';
import { CursoController } from './controllers/CursoController';
import { InstituicaoDeEnsinoController } from './controllers/InstituicaoDeEnsinoController';
import { authMiddleware } from './middlewares/authMiddleware';

const routes = Router()

routes.post('/login', new AuthController().login)

routes.use(authMiddleware)

routes.get('/instituicao', new InstituicaoDeEnsinoController().list)
routes.get('/instituicao/:id', new InstituicaoDeEnsinoController().listOne)
routes.post('/instituicao', new InstituicaoDeEnsinoController().create)
routes.put('/instituicao/:id', new InstituicaoDeEnsinoController().update)
routes.delete('/instituicao/:id', new InstituicaoDeEnsinoController().destroy)

routes.get('/empresa', new EmpresaController().list)
routes.get('/empresa/:id', new EmpresaController().listOne)
routes.post('/empresa', new EmpresaController().create)
routes.put('/empresa/:id', new EmpresaController().update)
routes.delete('/empresa/:id', new EmpresaController().destroy)

routes.get('/curso', new CursoController().list)
routes.get('/curso/:id', new CursoController().listOne)
routes.post('/curso', new CursoController().create)
routes.put('/curso/:id', new CursoController().update)
routes.delete('/curso/:id', new CursoController().destroy)

routes.get('/aluno', new AlunoController().list)
routes.get('/aluno/:id', new AlunoController().listOne)
routes.post('/aluno', new AlunoController().create)
routes.put('/aluno/:id', new AlunoController().update)
routes.delete('/aluno/:id', new AlunoController().destroy)

export default routes