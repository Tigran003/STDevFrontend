import React, { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectMovieData } from "../../Store/Slices/MovieSlice";
import {
  requestGetCurrentRoom,
  requestGetOnlyRoom,
  requestGetOnlyRoomMovie,
  requestPostRoomMovieSeat,
} from "../../Store/Slices/API";

const MovieDetail = () => {
  const { id, movie } = useParams();
  const dispatch = useDispatch();
  const { MoviesOnlyRoom, MoviesOnlyMovie, MoviesCurrentRoom } =
    useSelector(selectMovieData);
  const { background_image, duration, price, title, poster } =
    MoviesOnlyMovie?.[0] || [];
  const { rows, seats_per_row } = MoviesOnlyRoom;
  const scheduleId = MoviesCurrentRoom?.length > 0 && MoviesCurrentRoom?.[0].id;

  const [disabledSeats, setDisabledSeats] = useState([]);

  // Load disabled seats from localStorage
  useEffect(() => {
    const storedSeats = localStorage.getItem(`disabledSeats-${id}`);
    if (storedSeats) {
      setDisabledSeats(JSON.parse(storedSeats));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(requestGetOnlyRoom(id));
    }
    if (movie) {
      dispatch(requestGetOnlyRoomMovie(movie));
    }
  }, [dispatch, id, movie]);

  useEffect(() => {
    if (id) {
      dispatch(requestGetCurrentRoom(id));
    }
  }, [id, dispatch]);

  const handleSchedule = async (row, col) => {
    const seatKey = `${row}-${col}`;
    const updatedSeats = [...disabledSeats, seatKey];
    setDisabledSeats(updatedSeats);
    localStorage.setItem(`disabledSeats-${id}`, JSON.stringify(updatedSeats));

    const newObj = {
      position: [row, col],
      schedule: scheduleId,
    };

    try {
      await dispatch(requestPostRoomMovieSeat(newObj));
    } catch (error) {
      const revertedSeats = disabledSeats.filter((seat) => seat !== seatKey);
      setDisabledSeats(revertedSeats);
      localStorage.setItem(
        `disabledSeats-${id}`,
        JSON.stringify(revertedSeats)
      );
    }
  };

  return (
    <div className="MovieDetail">
      <div className="container-fluid">
        <div className="MovieDetail-bg">
          <div className="MovieDetail-bgImage">
            <img src={background_image} alt="" />
          </div>
          <div className="MovieDetail-poster">
            <img src={poster} alt="" />
            <div className="MovieDetail-info">
              <h1>{title}</h1>
              <p>
                <span style={{ display: "block" }}>Duration: {duration}m</span>
                <span>Price: {price}֏</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="MovieDetail-room">
        <div className="MovieDetail-roomInner">
          {Array.from({ length: rows }).map((_, indexRow) => (
            <div className="MovieDetail-roomInner-rows" key={indexRow}>
              <span style={{ lineHeight: "39px", width: "9.75px" }}>
                {indexRow + 1}
              </span>
              {Array.from({ length: seats_per_row }).map((_, indexCol) => {
                const seatKey = `${indexRow + 1}-${indexCol + 1}`;
                const isDisabled = disabledSeats.includes(seatKey);

                return (
                  <button
                    key={indexCol}
                    onClick={() => handleSchedule(indexRow + 1, indexCol + 1)}
                    disabled={isDisabled}
                    style={{
                      backgroundColor: isDisabled ? "gray" : "#fff",
                      color: "#000",
                      cursor: isDisabled ? "not-allowed" : "pointer",
                    }}
                  >
                    <span>{indexCol + 1}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
