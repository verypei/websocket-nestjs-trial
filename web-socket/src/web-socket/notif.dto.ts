import { IsString, IsNumber, IsBoolean } from 'class-validator';
export class NotifDto {
  @IsString()
  title: string;
  @IsString()
  detail: string;
  @IsString()
  category: string;
  @IsString()
  origin: string;
  @IsString()
  destination: string;
  @IsBoolean()
  status: boolean;
}
