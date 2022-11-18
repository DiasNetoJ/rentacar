import { Request, response, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { container } from "tsyringe";
class ImportCategoryController {

    async handle(request: Request, response: Response): Promise<Response> {
        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
        const { file } = request;
        await importCategoryUseCase.execute(file);
        console.log('sended');
        return response.status(201).send();
    }
}

export { ImportCategoryController }