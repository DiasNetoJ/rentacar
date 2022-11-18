import { ICreateCategoryDTO } from "../dto/ICreateCategoryDTO";
import { Category } from "../infra/typeorm/entities/Category";

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    create({name, description}: ICreateCategoryDTO): Promise<Category>;
    list(): Promise<Category[]>;
}

export { ICategoriesRepository }