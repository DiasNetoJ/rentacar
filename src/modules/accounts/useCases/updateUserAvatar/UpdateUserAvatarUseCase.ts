import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
// import { deleteFile } from "utils/file";

interface IRequest {
    id: string;
    avatar: string;
}

@injectable()
class UpdateUserAvatarUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ id, avatar }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(id);
        if (user.avatar) {
            // await deleteFile(`./tmp/avatar/${user.avatar}`);
        }
        return await this.usersRepository.update({ id, avatar });
    }
}

export { UpdateUserAvatarUseCase }