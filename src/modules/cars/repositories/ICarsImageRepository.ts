import { ICreateCarImageDTO } from "../dto/ICreateCarImageDTO";
import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImageRepository {
    create({car_id,  image_name}): Promise<CarImage>;
}

export { ICarsImageRepository }