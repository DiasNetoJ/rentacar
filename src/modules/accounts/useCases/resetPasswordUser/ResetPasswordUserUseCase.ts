import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/dateprovider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(token: string, password: string) {
        const userToken = await this.usersTokenRepository.findByRefreshToken(token);

        if (!userToken) {
            throw new AppError("Invalid token");
        }

        if (this.dateProvider.compareIfBefore(userToken.expires_date, new Date())) {
            throw new AppError("Expired token");
        }

        const user = await this.usersRepository.findById(userToken.user_id);
        user.password = await hash(password, 8);

        await this.usersRepository.update(user);
        await this.usersTokenRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUserUseCase };
