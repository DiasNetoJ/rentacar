import { AppError } from "@shared/errors/AppError";
import { ICreateCategoryDTO } from "@modules/cars/dto/ICreateCategoryDTO";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository ) {

    }

    async execute({name, description}: ICreateCategoryDTO): Promise<Category> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
        if (categoryAlreadyExists) {
            throw new AppError("Category already exists");
        }
        return this.categoriesRepository.create({ name, description });    
    }
}

export { CreateCategoryUseCase };
