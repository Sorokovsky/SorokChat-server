import { PartialType } from '@nestjs/mapped-types';
import { GetUserDto } from './get-user.dto';
export class FindUserDto extends PartialType(GetUserDto) {}