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

  isRegistered: boolean | null = null;

  constructor( 
    private backendAPIService:BackendService ) { 

    }

  ngOnInit(): void {
    this.addUser();
  }

  
  addUser(){
    let user: AddedUser = {
      username: "michelelai", password: "6379",
    };
    
    this.backendAPIService.regitrattion(user).subscribe({
      next: (res) => {
        if(res != null){
          this.isRegistered = true;
          console.log("loggato", res);
        }else{
          this.isRegistered = false;
          console.log("non loggato, valore null", res);
        }
        
      },
      error: (err) => {
        this.isRegistered = false;
        console.log("non loggato", err);
      }
    })
  }

}
