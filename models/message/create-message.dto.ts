import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { GetUserDto } from "models/user/get-user.dto";
import { OmitType } from '@nestjs/mapped-types';
import { GetChannelDto } from "models/channel/get-channel.dto";
export class CreateMessageDto {
    @ApiProperty()
    readonly author: GetUserDto;
    @ApiProperty()
    @IsString()
    readonly text: string;
    @ApiProperty()
    readonly channel?: GetChannelDto;
}
export class CreateMessageApi extends OmitType(CreateMessageDto, ['channel', 'author']) {
    @ApiProperty()
    readonly userId: GetUserDto['id'];
    @ApiProperty()
    readonly channelId: GetChannelDto['id'];
}