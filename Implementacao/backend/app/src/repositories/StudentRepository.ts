import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { AppDataSource } from '../data-source';

import { Aluno } from '../models/Aluno';
import { AlunoHasVantagem } from '../models/AlunoHasVantagem';
import { Curso } from '../models/Curso';
import { Vantagem } from '../models/Vantagem';

class StudentRepository {
    private dataSource = AppDataSource.getRepository(Aluno);
    private advantageDataSource = AppDataSource.getRepository(Vantagem);
    private courseDataSource = AppDataSource.getRepository(Curso);
    private studentAdvantageDataSource = AppDataSource.getRepository(AlunoHasVantagem);

    constructor() {}

    private getCourseById = async (courseId: number): Promise<Curso | null> => {
        const result = await this.courseDataSource.findOne({
            where: { 
                id: courseId 
            },
            relations: ['instituicaoDeEnsino']
        });

        return result;
    } 

    getByInstitutionId = async (id: number): Promise<Aluno[]> => {
        const students = await this.dataSource.findBy({ 
            instituicaoDeEnsino: { id } 
        })

        return students;
    }
    
    getById = async (id: number): Promise<Aluno | null> => {
        const student = await this.dataSource.findOne({ 
            where: { id },
            relations: ['instituicaoDeEnsino']
         });

        return student;
    }

    getByCredentials = async (id: number, email: string): Promise<Aluno | null> => {
        const student = await this.dataSource.findOneBy({ id, email });

        return student;
    }

    getByEmail = async (email: string): Promise<Aluno | null> => {
        const student = await this.dataSource.findOneBy({ email });

        return student;
    }
    
    create = async (student: Aluno, courseId: number): Promise<Aluno> => {
        const studentExists = await this.dataSource.findOneBy({ email: student.email });

        if (studentExists) {
            throw new Error('Estudante já cadastrado');
        }

        student.senha = await bcrypt.hash(student.senha, 10);

        const course = await this.getCourseById(courseId);

        if (!course) {
            throw new Error('Curso não encontrado');
        }

        const newStudent = this.dataSource.create({ ...student, curso: course, instituicaoDeEnsino: course.instituicaoDeEnsino });

        await this.dataSource.save(newStudent);

        return newStudent;
    }
    
    update = async (id: number, student: Partial<Aluno>, courseId?: number): Promise<Aluno> => {
        const studentToBeUpdated = await this.getById(id);

        if (!studentToBeUpdated) {
            throw new Error('Estudante não encontrado');
        }

        if (courseId) {
            const course = await this.getCourseById(courseId);

            if (course) {
                student.curso = course;
            }
        }

        const updateResults = await this.dataSource.update(id, student);

        if (updateResults.affected === 1) {
            const updatedStudent = this.dataSource.merge(studentToBeUpdated, student);

            return updatedStudent;
        } else {
            throw new Error('Ocorreu um erro ao atualizar o estudante');
        }
    }

    delete = async (id: number): Promise<boolean> => {
        const studentToBeDeleted = await this.getById(id);
        
        if (!studentToBeDeleted) {
            throw new Error('Estudante não encontrado');
        }

        const deleteResults = await this.dataSource.delete(studentToBeDeleted);

        if (deleteResults.affected === 1) {
            return true;
        } else {
            throw new Error('Ocorreu um erro ao apagar o estudante');
        }
    }

    acquireAdvantage = async (id: number, advantageId: number): Promise<AlunoHasVantagem> => {
        const student = await this.getById(id);

        if (!student) {
            throw new Error('Estudante não encontrado');
        }

        const advantage = await this.advantageDataSource.findOneBy({ id: advantageId });

        if (!advantage) {
            throw new Error('Vantagem não encontrada');
        }

        if (student.qtdeMoedas < advantage.custoMoedas) {
            throw new Error('O estudante não possui saldo suficiente para resgatar essa vantagem');
        }

        const studentAdvantage = this.studentAdvantageDataSource.create({
            alunoId: student,
            vantagemId: advantage,
            cupomGerado: uuidv4()
        });

        const savedResult = await this.studentAdvantageDataSource.save(studentAdvantage);

        const updatedBalance = (student.qtdeMoedas - advantage.custoMoedas);

        const updatedStudent = await this.update(student.id, { qtdeMoedas: updatedBalance });

        if (updatedStudent.qtdeMoedas != updatedBalance) {
            throw new Error('Ocorreu um erro ao atualizar o saldo do estudante');
        }
        
        return savedResult;
    }

    getAdvantagesByUserId = async (id: number): Promise<AlunoHasVantagem[]> => {
        const student = await this.getById(id);

        if (!student) {
            throw new Error('Estudante não encontrado');
        }

        const advantages = await this.studentAdvantageDataSource.find({
            where: {
                alunoId: student
            },
            relations: ['vantagemId']
        });

        return advantages;
    }
}

export default new StudentRepository();
