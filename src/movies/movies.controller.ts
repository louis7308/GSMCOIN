import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  Patch,
  Body,
} from '@nestjs/common';
import { CreateMovieDTO } from './DTO/create-movie.dto';
import { UpdateMovieDTO } from './DTO/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
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
