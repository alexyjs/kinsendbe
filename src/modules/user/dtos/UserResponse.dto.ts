/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsLowercase,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { UserProvider } from '../interfaces/user.interface';

export class PhoneNumber {
  @ApiProperty({ example: 123456, required: true, type: String })
  @IsString()
  phone: string;

  @ApiProperty({ example: 123, required: true, type: Number })
  @IsNumber()
  code: number;

  @ApiProperty({ example: 'US', required: true, type: String })
  @IsString()
  short: string;

  @ApiProperty({ example: 'VERIFY', required: true, type: String })
  @IsString()
  status?: string;

  @ApiProperty({ example: true, required: true, type: Boolean })
  @IsString()
  isPrimary?: boolean;
}
export class UserResponseDto {
  @ApiProperty({ example: '123-456-789', type: String })
  @MaxLength(50)
  @IsLowercase()
  @IsEmail()
  id: string;

  @ApiProperty({ example: 'lorem@gmail.com', type: String })
  @MaxLength(50)
  @IsLowercase()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Lo', required: true, type: String })
  @IsString()
  @Length(3, 50)
  firstName: string;

  @ApiProperty({ example: 'Rem', required: true, type: String })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'GOOGLE', required: true, type: UserProvider })
  @IsString()
  provider?: UserProvider;

  @ApiProperty({
    example: 'https://facebook.com/user',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  oneSocial?: string;

  @ApiProperty({ example: 123456, required: false, type: [PhoneNumber] })
  @IsOptional()
  phoneNumber?: [PhoneNumber];

  @ApiProperty({ example: 123456, required: false, type: String })
  @IsOptional()
  stripeCustomerUserId?: string;
}