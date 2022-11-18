import { DataSource } from "typeorm"; 
import datasource from "./src/config/datasource-config";

export const AppDataSourceExternal = new DataSource(datasource.config("localhost", 5433));


