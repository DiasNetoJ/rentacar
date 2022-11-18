import { DataSource } from "typeorm";
import datasource from "@config/datasource-config";

export const AppDataSource = new DataSource(datasource.config("postgres"));
