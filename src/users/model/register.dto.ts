import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "./user.model";


export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    accountName: string;

    @IsString()
    @IsNotEmpty()

    accountNumber: string;

    @IsString()
    @IsNotEmpty()
    bankName: string;

    @IsEnum(Role)
    role: Role;
}

