import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/storageprovider/IStorageProvider";
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
        private usersRepository: IUsersRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) { }

    async execute({ id, avatar }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(id);
        
        if (user.avatar) {
            await this.storageProvider.delete(user.avatar, "avatar");
        }
        
        await this.storageProvider.save(avatar, "avatar");
        return await this.usersRepository.update({ id, avatar });
    }
}

export { UpdateUserAvatarUseCase }