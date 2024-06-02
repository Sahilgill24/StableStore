import { IsNotEmpty,  IsString, IsDate, IsUrl, IsNumber } from 'class-validator';


export class CreateKYCDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  dob: Date;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @IsUrl()
  idFront: string;

  @IsNotEmpty()
  @IsUrl()
  idBack: string;

  @IsNotEmpty()
  @IsUrl()
  selfie: string;

}

export class CreateKYCPayload {
  @IsNotEmpty()
  data: CreateKYCDto;

  @IsNotEmpty()
  @IsNumber()
  userId: string;
}