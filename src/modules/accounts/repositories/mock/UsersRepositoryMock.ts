import { ICreateUserDTO } from "@modules/accounts/dto/ICreateUserDTO";
import { IUpdateUserDTO } from "@modules/accounts/dto/UpdateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UserRepositoryMock implements IUsersRepository {
    private users: User[] = [];

    async create({ name, password, email, driver_license, avatar }: ICreateUserDTO): Promise<User> {
        const user = new User();
        Object.assign(user, {
            name,
            password,
            email,
            driver_license,
            avatar
        });

        this.users.push(user);
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email);        
    }
    
    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id);
    }

    async update({ id, name, driver_license, avatar }: IUpdateUserDTO): Promise<User> {
        const user = this.users.find((user) => user.id === id);
        Object.assign(user, {
            name,            
            driver_license,
            avatar
        });

        return user;
    }

}

export { UserRepositoryMock }