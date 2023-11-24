import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { GetChannelDto } from 'models/channel/get-channel.dto';
import { GetMessageDto } from 'models/message/get-message.dto';
import { CreateUserDto } from './create-user.dto';
export class GetUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    @IsDate()
    readonly createdAt: Date;
    @IsDate()
    @ApiProperty()
    readonly updatedAt: Date;
    @ApiProperty()
    @IsNumber()
    readonly id: number;
    @ApiProperty()
    @IsOptional()
    messages?: GetMessageDto[];
    @ApiProperty()
    @IsOptional()
    channel?: GetChannelDto[];
    
}