import { ICreateCarImageDTO } from "@modules/cars/dto/ICreateCarImageDTO";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { AppDataSource } from "@shared/infra/typeorm/database";
import { Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";

class CarsImageRepository implements ICarsImageRepository {
    
    private repository: Repository<CarImage>;

    constructor() {
        this.repository = AppDataSource.getRepository(CarImage);
    }

    async create({ car_id, image_name }): Promise<CarImage> {
        const car = this.repository.create({ car_id, image_name });
        await this.repository.save(car)

        return car;
    }

}

export { CarsImageRepository }