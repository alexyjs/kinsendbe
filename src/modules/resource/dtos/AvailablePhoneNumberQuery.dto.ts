import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class AvailablePhoneNumberQueryDto {
  @ApiProperty({ example: 'US' })
  @IsString()
  @IsOptional()
  location: string;

  @ApiProperty({ example: '18778421073', required: true })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  useMock?: boolean;

  @ApiProperty({ example: '347', required: false })
  @IsOptional()
  @IsString()
  areaCode?: string;
}
