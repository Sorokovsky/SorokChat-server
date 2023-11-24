import { GetUserDto } from "models/user/get-user.dto";

export interface UserPayload {
    id: GetUserDto["id"];
}