import { BadRequestException, Injectable } from '@nestjs/common';
import { mkdir, rm, writeFile } from 'fs/promises';
import type { File } from 'models/file/file.type';
import * as nodePath from 'path';
@Injectable()
export class FilesService {
    private readonly staticFolder: string = nodePath.join(process.cwd(), 'static');
    async upload(folder: string, file: File): Promise<string> {
        try {
            const folderPath: string = nodePath.join(this.staticFolder, folder);
            const filePath: string = nodePath.join(folderPath, file.originalname);
            const result: string = nodePath.join(folder, file.originalname);
            await mkdir(folderPath, {recursive: true});
            await writeFile(filePath, file.buffer);
            return result;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    async delete(path: string): Promise<string> {
        try {
            const serverPath: string = nodePath.join(this.staticFolder, path);
            await rm(serverPath, {recursive: true});
            return path;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    getStaticFolder(): string {
        return this.staticFolder;
    }
}