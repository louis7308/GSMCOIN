import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './DTO/create-movie.dto';
import { UpdateMovieDTO } from './DTO/update-movie.dto';
import { Movie } from './entities/movie.entity'

@Injectable()
export class MoviesService {
  private movies : Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number) : Movie {
    const movie = this.movies.find(movie => movie.id === id)
    console.log(typeof(id))
    if(!movie) {
      throw new NotFoundException(`${id}번에 찾으시는 영화가 없습니다.`)
    } 
    return movie; 
  }

  deleteOne(id: number) {
    this.getOne(id) 
    this.movies = this.movies.filter(movie => movie.id !== id)
  }

  create(movieData: CreateMovieDTO) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData
    })
  }

  update(id: number, updateData: UpdateMovieDTO) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({...movie, ...updateData})
  }
}
