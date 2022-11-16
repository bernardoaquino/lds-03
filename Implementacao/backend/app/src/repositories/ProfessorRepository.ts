import bcrypt from 'bcrypt';

import { AppDataSource } from '../data-source';

import { Professor } from '../models/Professor';
import InstituteRepository from './InstituteRepository';

class ProfessorRepository {
    private dataSource = AppDataSource.getRepository(Professor);

    constructor() {}

    getById = async (id: number): Promise<Professor | null> => {
        const professor = await this.dataSource.findOneBy({ id });

        return professor;
    }

    getByCredentials = async (id: number, email: string): Promise<Professor | null> => {
        const professor = await this.dataSource.findOneBy({ id, email });

        return professor;
    }

    getByEmail = async (email: string): Promise<Professor | null> => {
        const professor = await this.dataSource.findOneBy({ email });

        return professor;
    }
    
    create = async (professor: Professor, departmentId: number): Promise<Professor> => {
        const professorExists = await this.dataSource.findOneBy({ email: professor.email });

        if (professorExists) {
            throw new Error('Professor já cadastrado');
        }

        professor.senha = await bcrypt.hash(professor.senha, 10);

        const department = await InstituteRepository.getDepartmentById(departmentId);

        if (!department) {
            throw new Error('Departamento não encontrado');
        }

        const newProfessor = this.dataSource.create({ ...professor, departamento: department });

        await this.dataSource.save(newProfessor);

        return newProfessor;
    }
    
    update = async (id: number, professor: Partial<Professor>, departmentId?: number): Promise<Professor> => {
        const professorToBeUpdated = await this.getById(id);

        if (!professorToBeUpdated) {
            throw new Error('Professor não encontrado');
        }

        if (departmentId) {
            const department = await InstituteRepository.getDepartmentById(departmentId);

            if (department) {
                professor.departamento = department;
            }
        }

        const updateResults = await this.dataSource.update(id, professor);

        if (updateResults.affected === 1) {
            const updatedStudent = this.dataSource.merge(professorToBeUpdated, professor);

            return updatedStudent;
        } else {
            throw new Error('Ocorreu um erro ao atualizar o professor');
        }
    }

    delete = async (id: number): Promise<boolean> => {
        const professorToBeDeleted = await this.getById(id);
        
        if (!professorToBeDeleted) {
            throw new Error('Professor não encontrado');
        }

        const deleteResults = await this.dataSource.delete(professorToBeDeleted);

        if (deleteResults.affected === 1) {
            return true;
        } else {
            throw new Error('Ocorreu um erro ao apagar o professor');
        }
    }
}

export default new ProfessorRepository();
