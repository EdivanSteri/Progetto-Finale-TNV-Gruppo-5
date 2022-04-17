﻿using MovieRating.Core.Service;
using MovieRating.Core.Service.Impl;
using MovieRating.Core.Eccezzioni;
using MovieRating.Core.Model;
using MovieRating.RestAPI.Model;
using Microsoft.AspNetCore.Mvc;

namespace MovieRating.RestAPI.Controllers
{
    [ApiController]
    [Route("comments")]
    public class MovieRatingController : ControllerBase
    {
        private MovieRatingService _movieRatingService;

        public MovieRatingController(MovieRatingService movieRatingService)
        {
            _movieRatingService = movieRatingService;
        }

        [HttpGet]
        public ActionResult<List<Comment>> GetAll([FromQuery(Name = "user-id")] int userId = 0)
        {
            if (userId > 0)
            {
                return Ok(_movieRatingService.GetAllCommentsByUserId(userId));
            }

            return Ok(_movieRatingService.GetAllComments());
        }

        [HttpGet]
        [Route("{comment-id}")]
        public ActionResult<Comment> GetById([FromRoute(Name = "comment-id")] int commentId)
        {
            try
            {
                return Ok(_movieRatingService.GetCommentById(commentId));
            }
            catch (NotFoundComment e)
            {
                return NotFound(BuildErrorResponse(e));
            }
        }

        [HttpPost]
        public ActionResult<Comment> Add([FromBody] MovieRatingDTO comment)
        {
            try
            {
                return Ok(_movieRatingService.AddComment(new()
                {
                    comment = comment.comment,
                    user_id = comment.user_id,
                    movie_id = comment.movie_id
                }));
            }
            catch (ShortComment e)
            {
                return BadRequest(BuildErrorResponse(e));
            }
            catch (ErrorMovieIdComment e)
            {
                return BadRequest(BuildErrorResponse(e));
            }
            catch (ErrorUserIdComment e)
            {
                return BadRequest(BuildErrorResponse(e));
            }
        }

        [HttpPut]
        [Route("{comment-id}")]
        public ActionResult<Comment> Update([FromBody] MovieRatingDTO comment, [FromRoute(Name = "comment-id")] int commentId)
        {
            try
            {
                return Ok(_movieRatingService.UpdateCommentById(commentId, new()
                {
                    comment = comment.comment,
                    user_id = comment.user_id,
                    movie_id = comment.movie_id
                }));
            }
            catch (NotFoundComment e)
            {
                return NotFound(BuildErrorResponse(e));
            }
            catch (ShortComment e)
            {
                return BadRequest(BuildErrorResponse(e));
            }
            catch (ErrorMovieIdComment e)
            {
                return BadRequest(BuildErrorResponse(e));
            }
            catch (ErrorUserIdComment e)
            {
                return BadRequest(BuildErrorResponse(e));
            }
        }

        [HttpDelete]
        [Route("{comment-id}")]
        public ActionResult Delete([FromRoute(Name = "comment-id")] int commentId)
        {
            try
            {
                _movieRatingService.DeleteCommentById(commentId);
                return NoContent();
            }
            catch (NotFoundComment e)
            {
                return NotFound(BuildErrorResponse(e));
            }
        }

        private static Error BuildErrorResponse(Exception e) => new()
        {
            Message = e.Message,
            TimeStamp = DateTime.Now
        };

    }
}
