import { mkdir, readdir, rm, writeFile } from "fs/promises";
import * as path from "path";
import { file, filePath, folder, folderPath } from "./data";

export async function createMockFile(): Promise<void> {
    await createMockFolder();
    return await writeFile(filePath, file.buffer);
}
export async function createMockFolder(): Promise<void> {
    await mkdir(folderPath, {recursive: true});
}
export async function deleteMockObject(isDir: boolean = true): Promise<void> {
    return isDir ? await rm(folderPath, {recursive: true}) : await rm(filePath, {recursive: true});
}
export async function checkExistFolder(): Promise<boolean> {
    const items: string[] = await readdir(path.join(process.cwd(), 'static'));
    return items.includes(folder);
}
export async function checkExistFile(): Promise<boolean> {
    const items: string[] = await readdir(path.join(process.cwd(), 'static', folder));
    return items.includes(file.originalname);
}