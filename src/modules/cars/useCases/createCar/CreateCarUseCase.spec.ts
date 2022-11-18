import { CarsRepositoryMock } from "@modules/cars/repositories/mock/CarsRepositoryMock";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

describe("Create car", () => {

    let createCarUseCase: CreateCarUseCase;
    let carsRepositoryMock: CarsRepositoryMock;

    beforeEach(() => {
        carsRepositoryMock = new CarsRepositoryMock();
        createCarUseCase = new CreateCarUseCase(carsRepositoryMock);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name car",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand car",
            category_id: "category"
        });

        expect(car).toHaveProperty("id");
    });

    it("should be able to create a new car available true as default", async () => {
        const car = await createCarUseCase.execute({
            name: "Name car",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand car",
            category_id: "category"
        });

        expect(car.available).toBe(true);
    });

    it("should not be able to create duplicated cars", async () => {
        await expect(async  () => {
            await createCarUseCase.execute({
                name: "Name car 1",
                description: "Description car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand car",
                category_id: "category"
            });

            await createCarUseCase.execute({
                name: "Name car 2",
                description: "Description car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand car",
                category_id: "category"
            });
        }).rejects.toEqual(new AppError("Car already exists"));
    });
})

