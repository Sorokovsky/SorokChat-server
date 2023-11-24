import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';
import { CreateChannelDto } from './create-channel.dto';
export class GetChannelDto extends PartialType(CreateChannelDto) {
    @ApiProperty()
    @IsNumber()
    readonly id: number;
    @ApiProperty()
    @IsDate()
    readonly createdAt: Date;
    @ApiProperty()
    @IsDate()
    readonly updatedAt: Date;
} 