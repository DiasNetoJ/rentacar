import { CarsRepositoryMock } from "@modules/cars/repositories/mock/CarsRepositoryMock";
import { SpecificationsRepositoryMock } from "@modules/cars/repositories/mock/SpecificationsRepositoryMock";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

describe("Create car specification", () => {

    let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
    let carsRepositoryMock: CarsRepositoryMock;
    let specificationsRepositoryMock: SpecificationsRepositoryMock;

    beforeEach(() => {
        carsRepositoryMock = new CarsRepositoryMock();
        specificationsRepositoryMock = new SpecificationsRepositoryMock();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryMock, specificationsRepositoryMock);
    })

    it("should not be able to add a new specification to an nonexistent car", async () => {
        await expect( async () => {
            const car_id = "1324";
            const specifications_id = ["4321"]
            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toEqual(new AppError("Car does not exists"));
    });

    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryMock.create({
            name: "Name car",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand car",
            category_id: "category"
        });

        const specification1 = await specificationsRepositoryMock.create({
            name: "test",
            description: "test"
        });

        const specifications_id = [specification1.id];
        const specificationsCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });
        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });
});