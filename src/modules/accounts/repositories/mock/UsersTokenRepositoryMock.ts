import { ICreateUsersTokenDTO } from "@modules/accounts/dto/ICreateUsersTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokenRepository } from "../IUsersTokenRepository";

class UsersTokenRepositoryMock implements IUsersTokenRepository {
    create({ expires_date, refresh_token, user_id }: ICreateUsersTokenDTO): Promise<UserTokens> {
        throw new Error("Method not implemented.");
    }
    findByUserAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        throw new Error("Method not implemented.");
    }

}

export { UsersTokenRepositoryMock }