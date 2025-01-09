import React, { useEffect } from "react";
import "./MovieRoomPage.css";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  requestGetCurrentRoom,
  requestGetOnlyRoom,
  requestGetOnlyRoomMovie,
} from "../../Store/Slices/API";
import { selectMovieData } from "../../Store/Slices/MovieSlice";

const MovieRoomPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { MoviesCurrentRoom, MoviesOnlyMovie } = useSelector(selectMovieData);

  const MoviesCurrentRoomMovieId =
    MoviesCurrentRoom?.length > 0 && MoviesCurrentRoom.map((el) => el?.movie);
  // const MoviesCurrentRoomId =
  //   MoviesCurrentRoom?.length > 0 && MoviesCurrentRoom.map((el) => el?.room);

  useEffect(() => {
    if (id) {
      dispatch(requestGetCurrentRoom(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (MoviesCurrentRoomMovieId) {
      dispatch(requestGetOnlyRoomMovie(MoviesCurrentRoomMovieId));
    }
  }, [dispatch, MoviesCurrentRoom]);

  // useEffect(() => {
  //   if (MoviesCurrentRoomId) {
  //     dispatch(requestGetOnlyRoom(MoviesCurrentRoomId));
  //   }
  // }, [dispatch, MoviesCurrentRoom]);

  const MovieOnlyMovieAll =
    MoviesOnlyMovie?.length > 0
      ? MoviesOnlyMovie.map((movie) => {
          const findedStart = MoviesCurrentRoom?.find(
            (el) => el?.movie === movie?.id
          );
          const startTime = findedStart?.start_time;

          const formattedStart = startTime
            ? format(new Date(startTime), "MM/dd/yyyy HH:mm:ss")
            : null;

          return {
            ...movie,
            start: formattedStart,
          };
        })
      : [];



  
 

  return (
    <div className="MovieRoomPage">
      {MovieOnlyMovieAll?.length > 0 &&
        MovieOnlyMovieAll.map((movie) => {
          return (
            <div
              className="MovieRoomPage-item"
              style={{ backgroundImage: `url("${movie?.background_image}")` }}
              key={movie?.id}
            >
              <NavLink to={`${movie?.id}`} className="MovieRoomPage-img">
                <img src={`${movie?.poster}`} alt="" />

                <div className="MovieRoomPage-info">
                  <h1>{movie?.title}</h1>
                  <p>
                    <span>Price: {movie?.price}֏</span>
                    <span>Duration: {movie?.duration}m</span>
                  </p>
                </div>
                <div className="MovieRoomPage-start">
                  <p>Start: {movie?.start}</p>
                </div>
              </NavLink>
            </div>
          );
        })}
    </div>
  );
};

export default MovieRoomPage;
