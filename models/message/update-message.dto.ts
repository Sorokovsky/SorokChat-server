import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageApi, CreateMessageDto } from './create-message.dto';
export class UpdateMessageDto extends PartialType(CreateMessageDto) {}
export class UpdateMessageApi extends PartialType(CreateMessageApi) {}