import { ICreateUsersTokenDTO } from "../dto/ICreateUsersTokenDTO"
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokenRepository {
    create({ expires_date, refresh_token, user_id }: ICreateUsersTokenDTO): Promise<UserTokens> ;
    findByUserAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens>;
    deleteById(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}

export { IUsersTokenRepository }