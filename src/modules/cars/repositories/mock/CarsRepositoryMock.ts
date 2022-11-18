import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { IFilterCarDTO } from "@modules/cars/dto/IFilterCarDTO";
import { IUpdateCarDTO } from "@modules/cars/dto/IUpdateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CreateCarUseCase } from "@modules/cars/useCases/createCar/CreateCarUseCase";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryMock implements ICarsRepository {
    

    private cars: Car[] = [];

    async listAll(): Promise<Car[]> {
        return this.cars;
    }

    async update({ id, name, description, daily_rate, fine_amount, license_plate, category_id, specifications }: IUpdateCarDTO): Promise<Car> {
        const car = await this.findById(id);
        Object.assign(car, {
            name,
            description,
            daily_rate,
            fine_amount,
            license_plate,
            category_id,
            specifications
        });

        this.cars.push(car);
        return car;
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id);
    }

    async findAvailables({ category_id, brand, name }: IFilterCarDTO): Promise<Car[]> {
        let filteredCars = this.cars.filter((car) => car.available);

        if (brand) {
            filteredCars = filteredCars.filter((car) => (car.brand === brand));
        }

        if (name) {
            filteredCars = filteredCars.filter((car) => (car.name === name));
        }

        if (category_id) {
            filteredCars = filteredCars.filter((car) => (car.category_id === category_id));
        }

        return filteredCars;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }


    async create({ name, description, daily_rate, fine_amount, license_plate, category_id, specifications }: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, {
            name,
            description,
            daily_rate,
            fine_amount,
            license_plate,
            category_id,
            specifications
        });

        this.cars.push(car);
        return car;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex((car) => car.id == id);
        this.cars[findIndex].available = available;
    }

}

export { CarsRepositoryMock }