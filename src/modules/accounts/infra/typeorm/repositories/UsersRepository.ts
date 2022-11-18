import { Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm/database/index";
import { ICreateUserDTO } from "@modules/accounts/dto/ICreateUserDTO";
import { IUpdateUserDTO } from "@modules/accounts/dto/UpdateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOneBy({ id });
        return user;
    }
    
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOneBy({ email});
        return user;
    }

    async create({ name, password, email, driver_license, avatar }: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({ name, password, email, driver_license, avatar });
        await this.repository.save(user);
        return user;
    }

    async update({ id, name, driver_license, avatar, password}: IUpdateUserDTO): Promise<User> {
        return await this.repository.save({ id, name, driver_license, avatar, password});
    }

}

export { UsersRepository };