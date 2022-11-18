import { AppDataSourceExternal } from "@root/data-source-external";
import { app } from "@shared/infra/http/app";
import { AppDataSource } from "@shared/infra/typeorm/database";
import { hash } from "bcryptjs";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 } from "uuid";

let dataSource: DataSource;

describe("Create category controller", () => {

   beforeAll(async () => {
      dataSource = await AppDataSourceExternal.initialize(); 
      await dataSource.runMigrations();
      const id = v4();
      const password = await hash("admin", 8);
      dataSource.query(`INSERT INTO USERS (id, name, password, email, isadmin, driver_license)
       values('${id}', 'admin', '${password}', 'admin@rentx.com.br', true, 'YYY-YYYY')`);
   });


   afterAll( async () => {
      await dataSource.dropDatabase();
      await dataSource.destroy();
      await AppDataSource.destroy();
   });


   it("should be able to create a new category", async () => {
      const responseToken = await request(app).post("/sessions")
      .send({
         email: "admin@rentx.com.br",
         password: "admin"
      });

      const { token } = responseToken.body;

      const response = await request(app)
         .post("/categories")
         .send({
            name: "Cateogry supertest",
            description: "Category supertest"
         })
         .set({
            Authorization: `Bearer ${token}`
         });

      expect(response.status).toBe(201);
   })
});