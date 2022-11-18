import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICreateRentalDTO } from "@modules/rentals/dto/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/dateprovider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

dayjs.extend(utc);

export const MINIMUM_HOURS = 24;

@injectable()
class CreateRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider, 
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }

    async execute({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user");
        }

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);
        if (carUnavailable) {
            throw new AppError("Car is unavaiable");
        }

        const compare = this.dateProvider.compareInHours(new Date(), expected_return_date);

        if (compare < MINIMUM_HOURS) {
            throw new AppError("Invalid return time");
        }

        const rental = await this.rentalsRepository.create({
            car_id,
            user_id,
            expected_return_date
        });        

        await this.carsRepository.updateAvailable(car_id, false);

        return rental;
    }
}

export { CreateRentalUseCase }