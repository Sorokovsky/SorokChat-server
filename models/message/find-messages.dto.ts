import { PartialType } from '@nestjs/mapped-types';
import { GetMessageDto } from './get-message.dto';
export class FindMessageDto extends PartialType(GetMessageDto) {}