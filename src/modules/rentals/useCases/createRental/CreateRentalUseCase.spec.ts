import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryMock } from "@modules/cars/repositories/mock/CarsRepositoryMock";
import { RentalsRepositoryMock } from "@modules/rentals/repositories/mock/RentalsRepositoryMock";
import { DayjsDateProvider } from "@shared/container/providers/dateprovider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";


import { CreateRentalUseCase } from "./CreateRentalUseCase";

describe("Create Rental", () => {

    const DAY_AFTER_24_HOURS = new Date(new Date().getTime() + (1 * 24 * 60 * 60 * 1000));
    let createRentalUseCase: CreateRentalUseCase;
    let rentalsRepositoryMock: RentalsRepositoryMock;
    let dayjsDateProvider: DayjsDateProvider;
    let carsRepository: ICarsRepository;

    beforeEach(() => {
        carsRepository = new CarsRepositoryMock();
        rentalsRepositoryMock = new RentalsRepositoryMock();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryMock, dayjsDateProvider, carsRepository);
    });

    it("should be able to create a new rental", async () => {
        const car = await carsRepository.create({
            name: "test",
            description: "car test",
            daily_rate: 100,
            license_plate: "zzz-yyyy",
            fine_amount: 40,
            category_id: "1234",
            brand: "brand test"
        });

        const rental = await createRentalUseCase.execute({
            user_id: "1324",
            car_id: car.id,
            expected_return_date: DAY_AFTER_24_HOURS
        })

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        const car = await carsRepository.create({
            name: 'Car test',
            description: "Car test",
            daily_rate: 100,
            license_plate: 'zzz-yyyy',
            fine_amount: 50,
            brand: 'new brand',
            category_id: "1234",            
        });

        const rental1 = await createRentalUseCase.execute({
            user_id: "1324",
            car_id: car.id,
            expected_return_date: DAY_AFTER_24_HOURS
        })

        await expect(async () => {
            const rental2 = await createRentalUseCase.execute({
                user_id: "1324",
                car_id: car.id,
                expected_return_date: DAY_AFTER_24_HOURS
            })

        }).rejects.toEqual(new AppError("There's a rental in progress for user"));
    });

    it("should not be able to create a new rental if there is another open to the same car", async () => {
        const car = await carsRepository.create({
            name: 'Car test',
            description: "Car test",
            daily_rate: 100,
            license_plate: 'zzz-yyyy',
            fine_amount: 50,
            brand: 'new brand',
            category_id: "1234",            
        });

        const rental1 = await createRentalUseCase.execute({
            user_id: "4561",
            car_id: car.id,
            expected_return_date: DAY_AFTER_24_HOURS
        })

        await expect(async () => {

            const rental2 = await createRentalUseCase.execute({
                user_id: "1234",
                car_id: car.id,
                expected_return_date: DAY_AFTER_24_HOURS
            })

        }).rejects.toEqual(new AppError("Car is unavaiable"));
    });

    it("should not be able to create a new rental with invalid return time", async () => {
        await expect(async () => {
            const rental1 = await createRentalUseCase.execute({
                user_id: "4561",
                car_id: "1234",
                expected_return_date: new Date()
            })

        }).rejects.toEqual(new AppError("Invalid return time"));
    });
});