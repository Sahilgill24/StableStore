import { IsArray, IsIP, IsString, IsUrl, Validate, ValidateNested, arrayMinSize } from "class-validator";

export class CreateAndUpdateApplicationDto {

    @IsString()
    public name: string;

    @IsString()
    public description: string;

    // @IsArray()
    // @ValidateNested({ each: true })
    // @IsIP()
    // public ipWhiteList: string[];

}

