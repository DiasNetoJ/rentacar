import fs from "fs";
import { parse } from "csv-parse";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { inject, injectable } from "tsyringe";

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {

    constructor(@inject("CategoriesRepository") private CategoriesRepository: CategoriesRepository) {

    }

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];
            const parseFile = parse();
            stream.pipe(parseFile);
            parseFile.on("data", async (line) => {
                const [name, description] = line;
                categories.push({
                    name,
                    description
                });
            }).on("end", () => {
                fs.promises.unlink(file.path);
                resolve(categories);
            }).on("error", (err) => {
                reject(err);
            });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        console.log('execute');
        const categories = await this.loadCategories(file);
        categories.map(category => {
            const { name, description } = category;
            const existsCategory = this.CategoriesRepository.findByName(name);

            if (!existsCategory) {
                this.CategoriesRepository.create({
                    name,
                    description
                })
            }
        });
        console.log('imported');
    }
}

export { ImportCategoryUseCase }