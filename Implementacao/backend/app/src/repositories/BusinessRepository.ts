import bcrypt from 'bcrypt';

import { AppDataSource } from '../data-source';

import { Empresa } from '../models/Empresa';

class BusinessRepository {
    private dataSource = AppDataSource.getRepository(Empresa);

    constructor() {}

    getById = async (id: number): Promise<Empresa | null> => {
        const business = await this.dataSource.findOneBy({ id });

        return business;
    }

    getByCredentials = async (id: number, email: string): Promise<Empresa | null> => {
        const business = await this.dataSource.findOneBy({ id, email });

        return business;
    }

    getByEmail = async (email: string): Promise<Empresa | null> => {
        const business = await this.dataSource.findOneBy({ email });

        return business;
    }
    
    create = async (business: Empresa): Promise<Empresa> => {
        const businessExists = await this.dataSource.findOneBy({ email: business.email });

        if (businessExists) {
            throw new Error('Empresa já cadastrado');
        }

        business.senha = await bcrypt.hash(business.senha, 10);

        const newBusiness = this.dataSource.create(business);

        await this.dataSource.save(newBusiness);

        return newBusiness;
    }
    
    update = async (id: number, business: Partial<Empresa>): Promise<Empresa> => {
        const businessToBeUpdated = await this.getById(id);

        if (!businessToBeUpdated) {
            throw new Error('Empresa não encontrada');
        }

        if (business.senha) {
            business.senha = await bcrypt.hash(business.senha, 10);
        }

        const updateResults = await this.dataSource.update(id, business);

        if (updateResults.affected === 1) {
            const updatedStudent = this.dataSource.merge(businessToBeUpdated, business);

            return updatedStudent;
        } else {
            throw new Error('Ocorreu um erro ao atualizar a empresa');
        }
    }

    delete = async (id: number): Promise<boolean> => {
        const businessToBeDeleted = await this.getById(id);
        
        if (!businessToBeDeleted) {
            throw new Error('Empresa não encontrada');
        }

        const deleteResults = await this.dataSource.delete(businessToBeDeleted);

        if (deleteResults.affected === 1) {
            return true;
        } else {
            throw new Error('Ocorreu um erro ao apagar a empresa');
        }
    }
}

export default new BusinessRepository();
