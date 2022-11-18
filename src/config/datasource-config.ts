import { User } from "@modules/accounts/infra/typeorm/entities/User"
import { Category } from "@modules/cars/infra/typeorm/entities/Category"
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification"
import { DataSourceOptions } from "typeorm"

export default {
    config(host: string, port: number = 5432): DataSourceOptions {
        const config: DataSourceOptions =  {
            "type": "postgres",
            "host": process.env.NODE_ENV === "test" ? "localhost" : host,
            "port": process.env.NODE_ENV === "test" ? 5433 : port,
            "username": "docker",
            "password": "rentx",
            "database": process.env.NODE_ENV === "test" ? "rentx_test" : "rentx",
            "logging": process.env.NODE_ENV !== "test",
            "migrations": ["./src/shared/infra/typeorm/database/migrations/*.ts"],
            "entities": ["./src/modules/**/infra/typeorm/entities/*.ts"]
        };
        // console.log(config);
        return config;
    }
}