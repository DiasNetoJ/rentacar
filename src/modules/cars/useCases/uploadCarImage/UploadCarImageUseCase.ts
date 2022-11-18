import { ICreateCarImageDTO } from "@modules/cars/dto/ICreateCarImageDTO";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class UploadCarImageUseCase {

    constructor(
        @inject("CarsImageRepository")
        private carsImageRepository: ICarsImageRepository
    ) {}

    async execute({car_id, images_name}: ICreateCarImageDTO): Promise<CarImage[]> {        
        const carsImage = images_name.map(async (image_name) => {
            return await this.carsImageRepository.create({ car_id, image_name });
        });

        return Promise.all(carsImage);        
    }
}

export { UploadCarImageUseCase }