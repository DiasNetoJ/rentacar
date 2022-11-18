import { ICreateRentalDTO } from "@modules/rentals/dto/ICreateRentalDTO";
import { IUpdateRentalDTO } from "@modules/rentals/dto/IUpdateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppDataSource } from "@shared/infra/typeorm/database";
import { IsNull, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {

    private repository: Repository<Rental>;

    constructor() {
        this.repository = AppDataSource.getRepository(Rental);
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        return this.repository.find({ 
            where: { user_id },
            relations: ["car"]
        });
    }

    async findByid(id: string): Promise<Rental> {
        return await this.repository.findOneBy({ id });
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return await this.repository.findOne({
            where: { car_id, end_date: IsNull() }
        });
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.findOne({
            where: { user_id, end_date: IsNull() }
        });
    }

    async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({ car_id, user_id, expected_return_date });
        await this.repository.save(rental);

        return rental;
    }


    async update({ id, car_id, expected_return_date, end_date, total }: IUpdateRentalDTO): Promise<Rental> {
        return await this.repository.save({ id, car_id, expected_return_date, end_date, total });
    }

}

export { RentalsRepository }