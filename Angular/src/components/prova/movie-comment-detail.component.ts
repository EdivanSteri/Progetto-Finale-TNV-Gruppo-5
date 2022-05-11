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

  isDeleted: boolean | null = null;

  constructor( 
    private backendAPIService:BackendService ) { 

    }

  ngOnInit(): void {
    this.deleteFavouMovieByUserId();
    this.deleteCommentsByUserId();
    this.deleteRatinsByUserId();

  }

  
  deleteCommentsByUserId(){
    this.backendAPIService.deleteCommentsByUserId(1001).subscribe({
      next: (res) =>{
        console.log("dalated comments", res)
      },
      error: (err) =>{
        console.log("not deleted comments", err)
      }
    })
  }

  deleteRatinsByUserId(){
    this.backendAPIService.deleteMovieRatingByUserId(1001).subscribe({
      next: (res) =>{
        console.log("dalated ratings", res)
      },
      error: (err) =>{
        console.log("not deleted ratings", err)
      }
    })
  }

  deleteFavouMovieByUserId(){
    this.backendAPIService.deleteFilmPreferitoByUserId(1001).subscribe({
      next: (res) =>{
        console.log("dalated favou movies", res)
      },
      error: (err) =>{
        console.log("not deleted favou movies", err)
      }
    })
  }




}
