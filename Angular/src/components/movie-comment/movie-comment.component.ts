import { Component, OnInit } from '@angular/core';
import { LoggedUser } from 'src/models/LoggedUser';
import { MovieComment } from 'src/models/MovieComment';
import { MovieTMDB } from 'src/models/MovieTMDB';
import { BackendService } from 'src/service/backend.service';

@Component({
  selector: 'app-movie-comment',
  templateUrl: './movie-comment.component.html',
  styleUrls: ['./movie-comment.component.scss']
})
export class MovieCommentComponent implements OnInit {


  commentsByMovieId: MovieComment []= [];
  notFoundComment: boolean | null = null;
  user: LoggedUser | null = null;
  arrayUser: LoggedUser [] | null= [];
  provaUser: boolean | null = null;
  arrayUsername: string [] = [];
  movieTMDB: MovieTMDB | null = null;

  constructor( 
    private backendAPIService:BackendService ) { 

    }

  ngOnInit(): void {
    this.backendAPIService.getMovieById(453395).subscribe({
      next: (res) => {
        this.movieTMDB = res,
        console.log(res, "film trovato")
      },
      error: (err) => {
        console.log(err, "film non trovato")
      }
    })
    this.getCommentsByMovieId();
  }

 
  getCommentsByMovieId(){
    this.backendAPIService.getAllMovieCommentsByMovieId(453395).subscribe({
      next: (res) => {
        this.commentsByMovieId = res,
        console.log(res, "commenti trovati")
        this.notFoundComment = false 
        for(let index=0; index< this.commentsByMovieId.length; index++)
          this.getUsernameByComment(this.commentsByMovieId[index].user_id);
          
        console.log(this.arrayUsername);
      },
      error: (err) => {
        console.log(err),
        this.notFoundComment = true;
      }
    })
  }

  getUsernameByComment(userId: number ){
    this.backendAPIService.getUserByuserId(userId).subscribe({
      next: (res) => {
        this.user = res,
        this.arrayUsername.push(res.username);
        this.provaUser = true;
      },
      error: (err) => {
        console.log(err),
        this.provaUser = false;
      }
    })
  }



}




