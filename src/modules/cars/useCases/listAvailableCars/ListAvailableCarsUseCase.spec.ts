import { CarsRepositoryMock } from "@modules/cars/repositories/mock/CarsRepositoryMock";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

describe("List cars", () => {

    let listAvailableCarsUseCase: ListAvailableCarsUseCase;
    let carsRepositoryMock: CarsRepositoryMock;

    beforeEach(() => {
        carsRepositoryMock = new CarsRepositoryMock();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryMock);    
    });

    it("should be able to list all available cars", async () => {
        const car1 = await carsRepositoryMock.create({
            name: "Name car",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand car",
            category_id: "8db8a10a-651e-46b8-ac37-e4c6b8820d5c",
        });

    
        const car2 = await carsRepositoryMock.create({
            name: "Name car 2",
            description: "Description car 2",
            daily_rate: 100,
            license_plate: "EFG-7890",
            fine_amount: 60,
            brand: "Brand car",
            category_id: "8db8a10a-651e-46b8-ac37-e4c6b8820d5c",
        });

        const expectedCars = [car1, car2];
        const all = await listAvailableCarsUseCase.execute({});
        expect(all).toEqual(expectedCars);
    });

    it("should be able to list all available cars by name", async () => {
        const car1 = await carsRepositoryMock.create({
            name: "Name car",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand car",
            category_id: "8db8a10a-651e-46b8-ac37-e4c6b8820d5c",
        });

    
        const car2 = await carsRepositoryMock.create({
            name: "Name car 2",
            description: "Description car 2",
            daily_rate: 100,
            license_plate: "EFG-7890",
            fine_amount: 60,
            brand: "Brand car",
            category_id: "8db8a10a-651e-46b8-ac37-e4c6b8820d5c",
        });

        const expectedCars = [car2];
        const all = await listAvailableCarsUseCase.execute({ name: "Name car 2"});
        expect(all).toEqual(expectedCars);
    });
});