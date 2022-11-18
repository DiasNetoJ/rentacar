import { IAuthenticateDTO } from "../../dto/IAuthenticateDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { IAuthenticateResponse } from "@modules/accounts/dto/IAuthenticateResponseDTO";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/dateprovider/IDateProvider";

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ email, password }: IAuthenticateDTO): Promise<IAuthenticateResponse> {
        const user = await this.userRepository.findByEmail(email);
        const {
            expires_in_token,
            secret_refresh_token,
            secret_token,
            expires_in_refresh_token,
            expires_refresh_token_days
        } = auth;

        if (!user) {
            throw new AppError("Email or password incorrect");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect");
        }

        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        });

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        });

        const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days);
        await this.usersTokenRepository.create({
            user_id: user.id,
            expires_date: refresh_token_expires_date,
            refresh_token
        })

        return {
            token,
            refresh_token,
            user: {
                name: user.name,
                email: user.email
            }
        };
    }
}

export { AuthenticateUserUseCase }