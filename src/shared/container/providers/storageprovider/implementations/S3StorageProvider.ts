import upload from "@config/upload";
import { S3 } from "aws-sdk";
import { IStorageProvider } from "../IStorageProvider";
import { resolve } from "path";
import fs from "fs";
import mime from "mime";

class S3StorageProvider implements IStorageProvider {

    private client: S3;

    constructor(){
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    }

    async save(file: string, folder: string): Promise<string> {
        const absolutePath = resolve(upload.tmpFolder, file);
        const fileContent = await fs.promises.readFile(absolutePath);
        const contentType = mime.getType(absolutePath);

        await this.client.putObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
            Body: fileContent,
            ContentType: contentType
        }).promise();

        await fs.promises.unlink(absolutePath);

        return file;
    }
    
    async delete(file: string, folder: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
        }).promise();
    }
}

export { S3StorageProvider }