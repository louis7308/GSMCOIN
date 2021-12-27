import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
export class Movie {
  @ApiProperty({ description: "아이디"})
  id?: number;
  @ApiProperty({ description: "제목"})
  title?: string;
  @ApiProperty({ description: "년도"})
  year?: number;
  @ApiProperty({ description: "장르"})
  genres?: string[];
}