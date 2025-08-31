import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "./user.model";


export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
 
    @IsString()
    @IsNotEmpty()
    readonly phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @IsString()
    @IsNotEmpty()
    readonly city: string;

    @IsString()
    @IsNotEmpty()
    readonly country: string;

    @IsString()
    @IsNotEmpty()
    readonly accountName: string;

    @IsString()
    @IsNotEmpty()
    readonly accountNumber: string;

    @IsEnum(Role)
    readonly role: Role;
}