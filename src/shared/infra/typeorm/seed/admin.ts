
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";
import { AppDataSourceExternal } from "@root/data-source-external";

async function create() {
    const id = uuidv4();
    const password = await hash("admin", 8);
    const dataSource = await AppDataSourceExternal.initialize();
    const result = await dataSource.query(`INSERT INTO USERS (id, name, password, email, isadmin, driver_license)
     values('${id}', 'admin', '${password}', 'admin@rentx.com.br', true, 'xxx-xxxx')`);
     console.log(result);
     dataSource.destroy();
}

create().then(() => console.log("User admin created"));