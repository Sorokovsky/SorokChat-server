import { Test, TestingModule } from '@nestjs/testing';
import * as nodePath from 'path';
import { file, folder, resultPath } from '../../mock/data';
import { checkExistFile, checkExistFolder, createMockFolder, createMockFile, deleteMockObject } from '../../mock/helpers';
import { FilesService } from './files.service';

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesService],
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should upload a file', async () => {
    const path: string = await service.upload(folder, file);
    expect(path).toBe(resultPath);
    const isExists: boolean = await checkExistFile();
    expect(isExists).toBeTruthy();
    await deleteMockObject();
  });
  it("should delete folder", async () => {
    await createMockFolder();
    const path: string = await service.delete(folder);
    expect(path).toBe(folder);
    const isExists: boolean = await checkExistFolder();
    expect(isExists).toBeFalsy();
  });
  it('should delete file', async () => {
    await createMockFile();
    const path: string = await service.delete(resultPath);
    expect(path).toBe(resultPath);
    const isExists: boolean = await checkExistFile();    
    expect(isExists).toBeFalsy();
    await deleteMockObject();
  });
});
