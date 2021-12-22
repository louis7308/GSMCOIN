import { PartialType } from "@nestjs/mapped-types"
import { CreateMovieDTO } from "./create-movie.dto";

// PartialType 을 사용할려면 npm install @nestjs/mapped-types
export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {}