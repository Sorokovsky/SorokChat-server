import { File } from "models/file/file.type";
import { CreateUserDto } from "models/user/create-user.dto";
import * as path from "path";
export const file: File = {
    buffer: Buffer.from("file"),
    mimetype: "image/png",
    originalname: "test.txt",
    path: "test.txt",
    size: 4,
    filename: "test.txt"
} as File;
export const user: CreateUserDto = {
    email: "<EMAIL>",
    password: "<PASSWORD>",
    name: "<NAME>",
    surname: "<SURNNAME>",
} as CreateUserDto;
export const folder: string = "folder";
export const folderPath: string = path.join(process.cwd(), 'static', folder);
export const filePath: string = path.join(folderPath, file.originalname);
export const resultPath: string = path.join(folder, file.originalname);
