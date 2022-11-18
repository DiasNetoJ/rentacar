import { ICreateRentalDTO } from "@modules/rentals/dto/ICreateRentalDTO";
import { IUpdateRentalDTO } from "@modules/rentals/dto/IUpdateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryMock implements IRentalsRepository {


    private rentals: Rental[] = [];

    async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();
        Object.assign(rental, {
            car_id,
            user_id,
            expected_return_date,
            start_date: new Date()
        });
        this.rentals.push(rental);
        return rental;
    }
    
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find((rental) => rental.car_id === car_id && !rental.end_date);
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find((rental) => rental.user_id === user_id && !rental.end_date);
    }

    async update({ id, car_id, expected_return_date, end_date, total }: IUpdateRentalDTO): Promise<Rental> {
        const rental = this.rentals.find((rental) => rental.id === id);
        Object.assign(rental, {
            car_id,
            expected_return_date,
            end_date,
            total
        });
        
        return rental;
    }
    
    async findByid(id: string): Promise<Rental> {
        return this.rentals.find((rental) => rental.id === id);
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        return this.rentals.filter((rental) => rental.user_id === user_id);
    }


}

export { RentalsRepositoryMock }