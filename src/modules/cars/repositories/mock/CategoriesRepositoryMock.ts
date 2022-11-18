import { ICreateCategoryDTO } from "@modules/cars/dto/ICreateCategoryDTO";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryMock implements ICategoriesRepository {
    categories: Category[] = [];

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find((category) => category.name === name);
        return category;
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        const category = new Category();
        Object.assign(category, {
            name, 
            description
        });
        
        this.categories.push(category);
        return category;
    }

    async list(): Promise<Category[]> {
        const all = this.categories;
        return all;
    }

}

export { CategoriesRepositoryMock }