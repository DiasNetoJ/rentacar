import { container } from "tsyringe";
import { IDateProvider } from "./dateprovider/IDateProvider";
import { DayjsDateProvider } from "./dateprovider/implementations/DayjsDateProvider";
import { IMailProvider } from "./mailprovider/IMailProvider";
import { EtherealMailProvider } from "./mailprovider/implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>(
    "DateProvider",
    DayjsDateProvider
)

container.registerInstance<IMailProvider>(
    "MailProvider",
    new EtherealMailProvider()
);