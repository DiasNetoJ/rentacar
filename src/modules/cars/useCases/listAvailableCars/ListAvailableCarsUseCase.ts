import { IFilterCarDTO } from "@modules/cars/dto/IFilterCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";



@injectable()
class ListAvailableCarsUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({category_id, brand, name}: IFilterCarDTO): Promise<Car[]> {
        const all = await this.carsRepository.findAvailables({category_id, brand, name});
        return all;
    }
}

export { ListAvailableCarsUseCase }