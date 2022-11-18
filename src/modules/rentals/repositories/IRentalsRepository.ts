import { ICreateRentalDTO } from "../dto/ICreateRentalDTO";
import { IUpdateRentalDTO } from "../dto/IUpdateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
        findOpenRentalByCar(car_id: string): Promise<Rental>;
        findOpenRentalByUser(user_id: string): Promise<Rental>;
        create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental>;
        update({id, car_id, expected_return_date, end_date, total }: IUpdateRentalDTO): Promise<Rental>;
        findByid(id: string): Promise<Rental>;
        findByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository }