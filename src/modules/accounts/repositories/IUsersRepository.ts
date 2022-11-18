import { ICreateUserDTO } from "../dto/ICreateUserDTO";
import { IUpdateUserDTO } from "../dto/UpdateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
    create({ name, password, email, driver_license, avatar }: ICreateUserDTO): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    update({ id, name, driver_license, avatar, password}: IUpdateUserDTO): Promise<User>;
}

export { IUsersRepository }