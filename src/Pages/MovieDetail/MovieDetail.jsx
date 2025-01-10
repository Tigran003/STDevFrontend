
import React, { useEffect, useState } from "react"; 
import "./MovieDetail.css"; 
import { useParams } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux"; 
import { selectMovieData } from "../../Store/Slices/MovieSlice"; 
import { 
  requestGetCurrentMovieSeats, 
  requestGetCurrentRoom, 
  requestGetOnlyRoom, 
  requestGetOnlyRoomMovie, 
  requestPostRoomMovieSeat, 
} from "../../Store/Slices/API"; 
 
const MovieDetail = () => { 
  const { id, movie } = useParams(); 
  const dispatch = useDispatch(); 
  const { 
    MoviesOnlyRoom, 
    MoviesOnlyMovie, 
    MoviesCurrentRoom, 
    MovieCurrentMovieSeats, 
  } = useSelector(selectMovieData); 
  const { background_image, duration, price, title, poster } = 
    MoviesOnlyMovie?.[0] || []; 
  const { rows, seats_per_row } = MoviesOnlyRoom; 
  const MoviesCurrentRoomOnly = 
    MoviesCurrentRoom?.length > 0 && 
    MoviesCurrentRoom.filter((el) => el?.movie === +movie); 
  const scheduleId = 
    MoviesCurrentRoomOnly?.length > 0 && MoviesCurrentRoomOnly?.[0].id; 
  const [rotation, setRotation] = useState(-10); 
 
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
    if (scheduleId) { 
      dispatch(requestGetCurrentMovieSeats(scheduleId)); 
    } 
  }, [id, dispatch, scheduleId]); 
 
  const handleSchedule = async (row, col) => { 
    // const newObj = { 
    //   position: ${row}, ${col}, 
    //   schedule: scheduleId, 
    // }; 
 
    const newObj = { 
      position: [row, col], 
      schedule: scheduleId, 
    }; 
 
    try { 
      await dispatch(requestPostRoomMovieSeat(newObj)).unwrap(); 
      await dispatch(requestGetCurrentMovieSeats(scheduleId)); 
    } catch (error) { 
      alert("This seat is already not exist"); 
    } 
  }; 
 
  useEffect(() => { 
    const handleScroll = () => { 
      const scrollY = window.scrollY; 
 
      const maxScroll = 300; 
      const minRotation = -10; 
      const maxRotation = 0; 
      const calculatedRotation = 
        scrollY > maxScroll 
          ? maxRotation 
          : minRotation + (scrollY / maxScroll) * (maxRotation - minRotation); 
 
      setRotation(calculatedRotation); 
    }; 
 
    window.addEventListener("scroll", handleScroll); 
 
    return () => { 
      window.removeEventListener("scroll", handleScroll); 
    }; 
  }, []); 
 
  return ( 
    <div className="MovieDetail"> 
      <div className="container-fluid"> 
        <div className="MovieDetail-bg"> 
          <div 
            className="MovieDetail-bgImage" 
            style={{ 
              transform: `rotateX(${rotation}deg)` 
            }} 
          > 
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
        {Array.from({ length: rows }).map((_, indexRow) => ( 
          <div className="MovieDetail-roomInner-rows" key={indexRow}> 
            <span style={{ lineHeight: "39px", width: "9.75px" }}> 
              {indexRow + 1} 
            </span> 
            {Array.from({ length: seats_per_row }).map((_, indexCol) => { 
              const isDisabled = 
                MovieCurrentMovieSeats?.length > 0 && 
                MovieCurrentMovieSeats.some((item) => { 
                  const [row, col] = item?.position; 
                  return row === indexRow + 1 && col === indexCol + 1; 
                }); 
              
              return ( 
                <button 
                  key={indexCol} 
                  onClick={() => handleSchedule(indexRow + 1, indexCol + 1)} 
                  disabled={isDisabled} 
                  style={{ 
                    backgroundColor: isDisabled ? "gray" : "#fff", 
                    color: isDisabled ? "#ccc" : "#000", 
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
  ); 
}; 
 
export default MovieDetail;
