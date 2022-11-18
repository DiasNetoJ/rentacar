import { AppDataSourceExternal } from "@root/data-source-external";
import { app } from "@shared/infra/http/app";
import { AppDataSource } from "@shared/infra/typeorm/database";
import { hash } from "bcryptjs";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 } from "uuid";

let dataSource: DataSource;

describe("List all categories controller", () => {

   beforeAll(async () => {
      dataSource = await AppDataSourceExternal.initialize();
      await dataSource.runMigrations();
      const id = v4();
      const password = await hash("admin", 8);
      await dataSource.query(`INSERT INTO USERS (id, name, password, email, isadmin, driver_license)
       values('${id}', 'admin', '${password}', 'admin@rentx.com.br', true, 'YYY-YYYY')`);
   });


   afterAll(async () => {
      await dataSource.dropDatabase();
      await dataSource.destroy();
      await AppDataSource.destroy();
   });


   it("should be able to list all categories", async () => {
      const responseToken = await request(app).post("/sessions")
         .send({
            email: "admin@rentx.com.br",
            password: "admin"
         });

      const { token } = responseToken.body;

      await request(app)
         .post("/categories")
         .send({
            name: "Category supertest",
            description: "Category supertest"
         })
         .set({
            Authorization: `Bearer ${token}`
         });

      const response = await request(app).get("/categories")
         .set({
            Authorization: `Bearer ${token}`
         });;

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0].name).toEqual("Category supertest");
   });

});