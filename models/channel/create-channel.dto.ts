import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { GetMessageDto } from "models/message/get-message.dto";
import { GetUserDto } from "models/user/get-user.dto";

export class CreateChannelDto {
    @ApiProperty({default: "SorokChannel"})
    @IsString()
    readonly name: string;
    @ApiProperty({default: "The best", required: false})
    @IsString()
    @IsOptional()
    readonly description?: string;
    @ApiProperty()
    readonly members: GetUserDto[];
    @ApiProperty()
    readonly messages: GetMessageDto[];
}