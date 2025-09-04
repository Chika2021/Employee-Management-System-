import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateClientDto {
  @IsString()
 @IsNotEmpty()
        clientFirstname: string;
    
  @IsString()
  @IsNotEmpty()
    readonly clientSurname: string;

  @IsString()
  @IsNotEmpty()
    readonly clientPhoneNumber: string;


  @IsString()
  @IsOptional()
    readonly clientAccountName: string;

  @IsString()
  @IsOptional()
    readonly clientAccountNumber: string;
}
