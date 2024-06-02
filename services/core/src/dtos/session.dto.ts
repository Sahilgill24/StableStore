import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SessionDto {
    @IsEmail()
    email: string;
    @IsNumber()
    amount: number;
    @IsString()
    @IsNotEmpty()
    walletAddress: string;
}