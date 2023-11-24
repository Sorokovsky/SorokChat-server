import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
import type { File } from "models/file/file.type";
export class CreateUserDto {
    @ApiProperty({default: "Sorokovskys@ukr.net", required: true})
    @IsEmail()
    readonly email: string;
    @IsString()
    @ApiProperty({required: true, default: "<PASSWORD>"})
    readonly password: string;
    @IsString()
    @IsOptional()
    @ApiProperty({required: false, default: "<NAME>"})
    readonly name?: string;
    @ApiProperty({required: false, default: "<SURNAME>"})
    @IsString()
    @IsOptional()
    readonly surname?: string;
    @ApiProperty({required: false, default: "<FILEPATH>"})
    @IsString()
    @IsOptional()
    readonly avatarPath?: string;
}
export class CreateUserApi extends OmitType(CreateUserDto, ["avatarPath"]) {
    @ApiProperty({required: false, type: 'string', format: "binary"})
    @IsString()
    @IsOptional()
    readonly avatar?: File;
}