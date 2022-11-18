import { ICreateUsersTokenDTO } from "@modules/accounts/dto/ICreateUsersTokenDTO";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { AppDataSource } from "@shared/infra/typeorm/database";
import { Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";

class UsersTokenRepository implements IUsersTokenRepository {
    private repository: Repository<UserTokens>

    constructor() {
        this.repository = AppDataSource.getRepository(UserTokens);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        return await this.repository.findOneBy({refresh_token});
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findByUserAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        return await this.repository.findOneBy({
            user_id,
            refresh_token
        });
    }

    async create({ expires_date, refresh_token, user_id }: ICreateUsersTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id
        });

        await this.repository.save(userToken);

        return userToken;
    }

}

export { UsersTokenRepository }