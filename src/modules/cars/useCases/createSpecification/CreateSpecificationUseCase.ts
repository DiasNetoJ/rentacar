import { AppError } from "@shared/errors/AppError";
import { ICreateSpecificationDTO } from "@modules/cars/dto/ICreateSpecificationDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateSpecificationUseCase {
    constructor (
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository) {

    }

    async execute({name, description}: ICreateSpecificationDTO): Promise<Specification> {
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);
        if (specificationAlreadyExists) {
            throw new AppError("Specification already exists");
        }
        return this.specificationsRepository.create({name, description});
    }
}

export { CreateSpecificationUseCase };
