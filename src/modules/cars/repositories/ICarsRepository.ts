import { ICreateCarDTO } from "../dto/ICreateCarDTO";
import { IFilterCarDTO } from "../dto/IFilterCarDTO";
import { IUpdateCarDTO } from "../dto/IUpdateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    update(data: IUpdateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    findAvailables({category_id, brand, name}: IFilterCarDTO): Promise<Car[]>;
    findById(id: string): Promise<Car>;
    updateAvailable(id: string, available: boolean): Promise<void>;
    listAll(): Promise<Car[]>;
}

export { ICarsRepository };
