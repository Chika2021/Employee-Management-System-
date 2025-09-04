import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {
    @IsString()
    @IsOptional()
        clientFirstname: string;
      
    @IsString()
    @IsOptional()
        clientSurname: string;    
    
      @IsString()
      @IsOptional()
        clientPhoneNumber: string;
    
    
      @IsString()
      @IsOptional()
        clientAccountName: string;
    
      @IsString()
      @IsOptional()
        clientAccountNumber: string;
}
