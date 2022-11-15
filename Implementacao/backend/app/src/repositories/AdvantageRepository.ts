/** DataSource */
import { AppDataSource } from '../data-source';


/** Models */
import { Empresa } from './../models/Empresa';
import { Vantagem } from '../models/Vantagem';

class AdvantageRepository {
    private dataSource = AppDataSource.getRepository(Vantagem);

    constructor() {}
    
    getById = async (id: number): Promise<Vantagem | null> => {
        const advantage = await this.dataSource.findOneBy({ id });

        return advantage;
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
