import { AppError } from "@shared/errors/AppError";
import { UserRepositoryMock } from "@modules/accounts/repositories/mock/UsersRepositoryMock";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryMock: UserRepositoryMock;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
    beforeEach(() => {
        userRepositoryMock = new UserRepositoryMock();
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryMock);
        createUserUseCase = new CreateUserUseCase(userRepositoryMock);
    });

    it("should be able to authenticate an user", async () => {
        const user = {
            name: "Jose Dias",
            email: "diasnetoj@gmail.com",
            password: "1234",
            driver_license: "0001452",
        }

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", async () => {
        await expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@false.com",
                password: "wrongpass"
            });
        }).rejects.toEqual(new AppError("Email or password incorrect"));
    });

    it("should not be able to authenticate with incorret password", async () => {
        await expect(async () => {
            const user = {
                name: "Jose Dias",
                email: "diasnetoj@gmail.com",
                password: "1234",
                driver_license: "0001452",
            }

            await createUserUseCase.execute(user);

            const result = await authenticateUserUseCase.execute({
                email: user.email,
                password: "IncorretPassword"
            });

        }).rejects.toEqual(new AppError("Email or password incorrect"));
    });
});