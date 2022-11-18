import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { IDateProvider } from "@shared/container/providers/dateprovider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe"



export const MINIMUM_DAILY = 1;

@injectable()
class DevolutionRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider, 
    ) {}

    async execute(id: string): Promise<Rental> {
        const rental = await this.rentalsRepository.findByid(id);
        const car = await this.carsRepository.findById(rental.car_id);
        if (!rental) {
            throw new AppError("Rental does not exists");
        }

        if (rental.end_date) {
            throw new AppError("Car already returned");
        }

        if (!car) {
            throw new AppError("Car does not exists");
        }
        

        let daily = this.dateProvider.compareInDays(rental.start_date, new Date());
        if (daily <= 0) {
            daily = MINIMUM_DAILY;
        }

        const delay = this.dateProvider.compareInDays(new Date(), rental.expected_return_date);

        let total = 0;
        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = new Date();
        rental.total = total;

        await this.rentalsRepository.update(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase }