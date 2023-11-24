import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const Cookie = createParamDecorator(
    (data: keyof Request['cookies'], context: ExecutionContext) => {
        const request: Request = context.switchToHttp().getRequest();
        return data ? request.cookies[data] : request.cookies;
    }
)