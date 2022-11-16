/** DataSource */
import { AppDataSource } from '../data-source';


/** Models */
import { Empresa } from './../models/Empresa';
import { Vantagem } from '../models/Vantagem';
import BusinessRepository from './BusinessRepository';

class AdvantageRepository {
    private dataSource = AppDataSource.getRepository(Vantagem);

    constructor() {}
    
    getById = async (id: number): Promise<Vantagem | null> => {
        const advantage = await this.dataSource.findOneBy({ id });

        return advantage;
    }

    getByBusinessId = async (businessId: number): Promise<Vantagem[] | null> => {
        const business = await BusinessRepository.getById(businessId);

        if (!business) {
            throw new Error('Empresa não encontrada');
        }

        const advantages = await this.dataSource.findBy({ empresa: business });

        return advantages;
    }

    findAll = async (): Promise<Vantagem[] | null> => {
        const advantages = await this.dataSource.find();

        return advantages;
    }
    
    create = async (business: Empresa, advantage: Partial<Vantagem>): Promise<Vantagem> => {
        const newAdvantage = this.dataSource.create({
            ...advantage,
            empresa: business
        });

        await this.dataSource.save(newAdvantage);

        return newAdvantage;
    }
    
    update = async (id: number, advantage: Partial<Vantagem>): Promise<Vantagem> => {
        const advantageToBeUpdated = await this.getById(id);

        if (!advantageToBeUpdated) {
            throw new Error('Vantagem não encontrada');
        }

        const updateResults = await this.dataSource.update(id, advantage);

        if (updateResults.affected === 1) {
            const updatedAdvantage = this.dataSource.merge(advantageToBeUpdated, advantage);

            return updatedAdvantage;
        } else {
            throw new Error('Ocorreu um erro ao atualizar a vantagem');
        }
    }

    delete = async (id: number): Promise<boolean> => {
        const advantageToBeDeleted = await this.getById(id);
        
        if (!advantageToBeDeleted) {
            throw new Error('Vantagem não encontrada');
        }

        const deleteResults = await this.dataSource.delete(advantageToBeDeleted);

        if (deleteResults.affected === 1) {
            return true;
        } else {
            throw new Error('Ocorreu um erro ao apagar a vantagem');
        }
    }
}

export default new AdvantageRepository();
