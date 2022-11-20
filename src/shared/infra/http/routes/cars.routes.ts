import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationControler } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { Router } from "express";
import multer from "multer";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();
const uploadCarImage = multer(uploadConfig);

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationControler();
const uploadCarImageController = new UploadCarImageController();
const listCarsController = new ListCarsController();

carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.get("/", listCarsController.handle);
carsRoutes.use(ensureAuthenticated);
carsRoutes.post("/", ensureAdmin, createCarController.handle);
carsRoutes.post("/specifications/:car_id", ensureAdmin, createCarSpecificationController.handle);
carsRoutes.patch("/uploadImage/:car_id", ensureAdmin, uploadCarImage.array("images_name"), uploadCarImageController.handle);


export { carsRoutes };
