import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { IFilterCarDTO } from "@modules/cars/dto/IFilterCarDTO";
import { IUpdateCarDTO } from "@modules/cars/dto/IUpdateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppDataSource } from "@shared/infra/typeorm/database";
import { Repository } from "typeorm";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>;

    constructor() {
        this.repository = AppDataSource.getRepository(Car);
    }

    async listAll(): Promise<Car[]> {
        return await this.repository.find();
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
        .createQueryBuilder()
        .update()
        .set({available})   
        .where("id = :id")
        .setParameters({id})
        .execute();
    }

    async update({ id, name, description, license_plate, daily_rate, fine_amount, brand, category_id, specifications }: IUpdateCarDTO): Promise<Car> {
        const car = this.repository.create({
            id,
            name,
            description,
            license_plate,
            daily_rate,
            fine_amount,
            brand,
            category_id,
            specifications
        });

        await this.repository.save(car);
        console.log(car);
        return car;
    }
    
    async findById(id: string): Promise<Car> {
        return await this.repository.findOneBy({ id });
    }

    async findAvailables({category_id, brand, name}: IFilterCarDTO): Promise<Car[]> {
        const carsQuery = this.repository.createQueryBuilder("car")
        .where("available = :available", { available: true });

        if (name) {
            carsQuery.andWhere("car.name  = :name", { name: name });
        }

        if (brand) {
            carsQuery.andWhere("car.brand  = :brand", { brand: brand });
        }

        if (category_id) {
            carsQuery.andWhere("car.category_id  = :category_id", { category_id: category_id });
        }

        return await carsQuery.getMany();
    }

    async create({ name, description, license_plate, daily_rate, fine_amount, brand, category_id, specifications }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            license_plate,
            daily_rate,
            fine_amount,
            brand,
            category_id,
            specifications
        });

        await this.repository.save(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return await this.repository.findOneBy({ license_plate });
    }

}

export { CarsRepository };
