import { In, Repository } from "typeorm";
import { ICreateSpecificationDTO } from "@modules/cars/dto/ICreateSpecificationDTO";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppDataSource } from "@shared/infra/typeorm/database/index";;
import { Specification } from "../entities/Specification";


class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = AppDataSource.getRepository(Specification);
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        return await this.repository.findBy({ id: In(ids) });
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOneBy({ name });
        return specification;
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            name,
            description
        });
        await this.repository.save(specification);
        return specification;
    }

}

export { SpecificationsRepository };