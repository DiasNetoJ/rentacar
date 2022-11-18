import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCarsUseCase {

    constructor(
        @inject("CarsRepository")
        private CarsRepository: ICarsRepository
    ) {}

    async execute(): Promise<Car[]> {
        return await this.CarsRepository.listAll();
    }
}

export { ListCarsUseCase }