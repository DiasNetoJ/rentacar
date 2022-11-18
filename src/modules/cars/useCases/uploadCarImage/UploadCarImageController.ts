import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

class UploadCarImageController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { car_id } = request.params;
        const images = request.files as Express.Multer.File[];
        const images_name = images.map((file) => file.filename)
        const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);
        const carImages = await uploadCarImageUseCase.execute({ car_id, images_name });
        return response.status(201).json(carImages);
    }
}

export { UploadCarImageController }