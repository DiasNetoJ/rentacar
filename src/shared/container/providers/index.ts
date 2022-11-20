import "dotenv/config";
import { container } from "tsyringe";
import { IDateProvider } from "./dateprovider/IDateProvider";
import { DayjsDateProvider } from "./dateprovider/implementations/DayjsDateProvider";
import { IMailProvider } from "./mailprovider/IMailProvider";
import { EtherealMailProvider } from "./mailprovider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./storageprovider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./storageprovider/implementations/S3StorageProvider";
import { IStorageProvider } from "./storageprovider/IStorageProvider";

container.registerSingleton<IDateProvider>(
    "DateProvider",
    DayjsDateProvider
)

container.registerInstance<IMailProvider>(
    "MailProvider",
    new EtherealMailProvider()
);

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.disk]
);