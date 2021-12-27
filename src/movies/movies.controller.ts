import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  Patch,
  Body,
  Res,
} from '@nestjs/common';
import { CreateMovieDTO } from './DTO/create-movie.dto';
import { UpdateMovieDTO } from './DTO/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger"

@Controller('movies')
@ApiTags("영화 API")
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}
  @Get()
  @ApiOperation({ summary: "전체 영화 데이터 API", description: "GET 요청시 영화 전체 데이터 긁어옴"})
  @ApiCreatedResponse({ description: "GET 요청시 영화 전체 데이터 긁어옴", type: Movie})
  @ApiOkResponse({status: 201})
  async getAll(@Body() requestDto, @Res() res): Promise<Movie> {
    const user: Movie = {
      id: 1
    }
    return res.status(200).json(user)
  }

  @Get('/:id')
  getOne(@Param('id') search_id: number) {
    return this.moviesService.getOne(search_id)
  }

  @Post()
  create(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.create(movieData)
  }

  @Delete("/:id")
  movieboard(@Param("id") movieId: number) {
      return this.moviesService.deleteOne(movieId)
  }

  @Put()
  AlldataMovie() {
      return 'All data movie'
  }

  @Patch("/:id")
  dataUpdateMovie(@Param("id") movieId: number, @Body() updateData: UpdateMovieDTO) {
    return this.moviesService.update(movieId, updateData);
  }


}
