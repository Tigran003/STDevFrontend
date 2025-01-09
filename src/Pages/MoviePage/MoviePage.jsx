import React, { useRef, useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { requestGetMovieData } from "../../Store/Slices/API";
import { selectMovieData } from "../../Store/Slices/MovieSlice";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./MoviePage.css";
import { EffectCoverflow, Pagination } from "swiper/modules";
import MovieRooms from "../../Components/MovieRooms/MovieRooms";

const MoviePage = () => {
  const dispatch = useDispatch();
  const { MoviesDataIsLoading, MoviesData, MoviesDataIsError } =
    useSelector(selectMovieData);
  useEffect(() => {
    dispatch(requestGetMovieData());
  }, [dispatch]);

  return (
    <div className="MoviePage">
      {MoviesDataIsLoading || MoviesDataIsError ? (
        <Loader />
      ) : (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {MoviesData?.length > 0 &&
            MoviesData.map((movie) => {
              return (
                <SwiperSlide key={movie?.id} className="MoviePage-item">
                  <div className="MoviePage-bg">
                    <img src={`${movie?.background_image}`} alt="" />
                    <div className="MoviePage-info">
                      <h1>{movie?.title}</h1>
                      <p>
                        <span style={{ marginRight: "1rem" }}>
                          Duration: {movie?.duration}
                        </span>

                        <span>Price: {movie?.price}</span>
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
      <MovieRooms />
    </div>
  );
};

export default MoviePage;
