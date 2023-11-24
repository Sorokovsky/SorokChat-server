import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { File } from 'models/file/file.type';
import { GetUserDto } from './get-user.dto';
export class UpdateUserDto extends OmitType(GetUserDto, ['id', 'updatedAt', 'createdAt']) {}
export class UpdateUserApi extends OmitType(GetUserDto, ['id', 'updatedAt', 'createdAt', 'avatarPath']) {
    @ApiProperty({type: 'string', format: 'binary'})
    @IsOptional()
    avatarPath?: File;
}