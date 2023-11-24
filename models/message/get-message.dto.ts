import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateMessageDto } from './create-message.dto';
export class GetMessageDto extends PartialType(CreateMessageDto) {
    @ApiProperty()
    @IsNumber()
    readonly id: number;
}