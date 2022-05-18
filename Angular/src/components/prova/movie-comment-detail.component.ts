import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieComment } from 'src/models/MovieComment';
import { AddedUser } from 'src/models/AddedUser';
import { BackendService } from 'src/service/backend.service';
import { MovieRatingComponent } from '../movie-rating/movie-rating.component';

@Component({
  selector: 'app-movie-comment-detail',
  templateUrl: './movie-comment-detail.component.html',
  styleUrls: ['./movie-comment-detail.component.scss']
})
export class MovieCommentDetailComponent implements OnInit {

  commentsByMovieId: MovieComment []= [];
  prova: boolean | null = null;

  constructor( 
    private backendAPIService:BackendService ) { 

    }

  ngOnInit(): void {
    this.getCommentsByMovieId();
  }

 
  getCommentsByMovieId(){
    this.backendAPIService.getAllMovieCommentsByMovieId(453395).subscribe({
      next: (res) => {
        this.commentsByMovieId = res,
        console.log(res, "commenti trovati")
        this.prova = true;
      },
      error: (err) => {
        console.log(err),
        this.prova = false;
      }
    })
  }



}
