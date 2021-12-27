import { IsNumber, IsString, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateMovieDTO {
  @IsString()
  @ApiProperty({ description: "제목"})
  readonly title: string;

  @IsNumber()
  @ApiProperty({ description: "년도"})
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ description: "몰라"})
  readonly genres: string[]; 
}