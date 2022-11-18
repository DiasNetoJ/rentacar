import { CreateUserUseCase } from "./CreateUserUseCase";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name,  password, email, driver_license } = request.body;
        const createUserUseCase = container.resolve(CreateUserUseCase);
        const user: User = await createUserUseCase.execute( { name, password, email, driver_license });
        return response.status(201).send(user);
    }
}

export { CreateUserController };