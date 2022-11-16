import bcrypt from 'bcrypt'

import { AppDataSource } from '../data-source';

import { InstituicaoDeEnsino } from '../models/InstituicaoDeEnsino';
import { Curso } from '../models/Curso';
import { Departamento } from '../models/Departamento';

class InstituteRepository {
    private dataSource = AppDataSource.getRepository(InstituicaoDeEnsino);
    private departmentDataSource = AppDataSource.getRepository(Departamento);
    private courseDataSource = AppDataSource.getRepository(Curso);

    constructor() {}

    getCoursesByInstitutionId = async (institutionId: number): Promise<Curso[]> => {
        const institution = await this.getById(institutionId);

        if (!institution) {
            throw new Error('Instituição não encontrada');
        }

        const result = await this.courseDataSource.find({ 
            where: {
                instituicaoDeEnsino: institution
            }, 
            relations: ['instituicaoDeEnsino'] 
        });

        return result;
    }

    getCourseById = async (courseId: number): Promise<Curso | null> => {
        const result = await this.courseDataSource.findOne({ 
            where: {
                id: courseId
            }, 
            relations: ['instituicaoDeEnsino'] 
        });

        return result;
    }

    getDepartmentsByInstitutionId = async (institutionId: number): Promise<Departamento[]> => {
        const institution = await this.getById(institutionId);

        if (!institution) {
            throw new Error('Instituição não encontrada');
        }

        const departments = await this.departmentDataSource.findBy({ instituicaoDeEnsino: institution });

        return departments;
    }

    getDepartmentById = async (departmentId: number): Promise<Departamento | null> => {
        const result = await this.departmentDataSource.findOne({ 
            where: { id: departmentId },
            relations: ['instituicaoDeEnsino']
         });

        return result;
    }

    getByCredentials = async (id: number, email: string): Promise<InstituicaoDeEnsino | null> => {
        const institution = await this.dataSource.findOneBy({ id, email });

        return institution;
    }
    
    getById = async (id: number): Promise<InstituicaoDeEnsino | null> => {
        const student = await this.dataSource.findOneBy({ id });

        return student;
    }

    getByEmail = async (email: string): Promise<InstituicaoDeEnsino | null> => {
        const institution = await this.dataSource.findOneBy({ email });

        return institution;
    }

    listAll = async (): Promise<InstituicaoDeEnsino[]> => {
        const institutions = await this.dataSource.find();

        return institutions;
    }
    
    create = async (institution: InstituicaoDeEnsino): Promise<InstituicaoDeEnsino> => {
        const institutionExists = await this.dataSource.findOneBy({ email: institution.email });

        if (institutionExists) {
            throw new Error('Instituição já cadastrada');
        }

        institution.senha = await bcrypt.hash(institution.senha, 10);

        const newInstitution = this.dataSource.create(institution);

        await this.dataSource.save(newInstitution);

        return newInstitution;
    }
    
    update = async (id: number, institution: InstituicaoDeEnsino): Promise<InstituicaoDeEnsino> => {
        const institutionToBeUpdated = await this.getById(id);

        if (!institutionToBeUpdated) {
            throw new Error('Estudante não encontrado');
        }

        const updateResults = await this.dataSource.update(id, institution);

        if (updateResults.affected === 1) {
            const updatedStudent = this.dataSource.merge(institutionToBeUpdated, institution);

            return updatedStudent;
        } else {
            throw new Error('Ocorreu um erro ao atualizar o estudante');
        }
    }

    delete = async (id: number): Promise<boolean> => {
        const institutionToBeDeleted = await this.getById(id);
        
        if (!institutionToBeDeleted) {
            throw new Error('Estudante não encontrado');
        }

        const deleteResults = await this.dataSource.delete(institutionToBeDeleted);

        if (deleteResults.affected === 1) {
            return true;
        } else {
            throw new Error('Ocorreu um erro ao apagar a instituição');
        }
    }

    addDepartment = async (institution: InstituicaoDeEnsino, department: Departamento): Promise<Departamento> => {
        const departmentToBeCreated = this.departmentDataSource.create({ ...department, instituicaoDeEnsino: institution });

        const createdDepartment = await this.departmentDataSource.save(departmentToBeCreated);

        return createdDepartment;
    }

    updateDepartment = async (id: number, department: Departamento): Promise<Departamento> => {
        const departmentToBeUpdated = await this.getDepartmentById(id);

        if (!departmentToBeUpdated) {
            throw new Error('Departamento não encontrado');
        }

        const updateResults = await this.departmentDataSource.update(id, department);

        if (updateResults.affected === 1) {
            const updatedDepartment = this.departmentDataSource.merge(departmentToBeUpdated, department);

            return updatedDepartment;
        } else {
            throw new Error('Ocorreu um erro ao atualizar o departamento');
        }
    }

    deleteDepartment = async (id: number): Promise<boolean> => {
        const departmentToBeDeleted = await this.getDepartmentById(id);

        if (!departmentToBeDeleted) {
            throw new Error('Estudante não encontrado');
        }

        const deleteResults = await this.departmentDataSource.delete(departmentToBeDeleted);

        if (deleteResults.affected === 1) {
            return true;
        } else {
            throw new Error('Ocorreu um erro ao apagar o departamento');
        }
    }

    addCourse = async (institution: InstituicaoDeEnsino, course: Curso): Promise<Curso> => {
        const courseToBeCreated = this.courseDataSource.create({ ...course, instituicaoDeEnsino: institution });

        const createdCourse = await this.courseDataSource.save(courseToBeCreated);

        return createdCourse;
    }

    updateCourse = async (id: number, course: Curso): Promise<Curso> => {
        const courseToBeUpdated = await this.getCourseById(id);

        if (!courseToBeUpdated) {
            throw new Error('Curso não encontrado');
        }

        const updateResults = await this.courseDataSource.update(id, course);

        if (updateResults.affected === 1) {
            const updatedCourse = this.courseDataSource.merge(courseToBeUpdated, course);

            return updatedCourse;
        } else {
            throw new Error('Ocorreu um erro ao atualizar o departamento');
        }
    }

    deleteCourse = async (id: number): Promise<boolean> => {
        const courseToBeDeleted = await this.getCourseById(id);

        if (!courseToBeDeleted) {
            throw new Error('Curso não encontrado');
        }

        const deleteResults = await this.courseDataSource.delete(courseToBeDeleted);

        if (deleteResults.affected === 1) {
            return true;
        } else {
            throw new Error('Ocorreu um erro ao apagar o curso');
        }
    }
}

export default new InstituteRepository();
