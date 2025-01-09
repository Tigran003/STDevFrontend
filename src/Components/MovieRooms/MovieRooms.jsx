import React, { useEffect, useState } from "react";
import roomFirst from "../../Assets/asia-culturecenter-COWf-5ZtZ6w-unsplash.jpg";
import roomSecond from "../../Assets/claire-p-tAFPfaSVjNQ-unsplash.jpg";
import roomThree from "../../Assets/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg";
import roomFour from "../../Assets/yolanda-djajakesukma-4y2ar8OQt4U-unsplash.jpg";
import "./MovieRooms.css";
import { requestGetRoomsData } from "../../Store/Slices/API";
import { useDispatch, useSelector } from "react-redux";
import { selectMovieData } from "../../Store/Slices/MovieSlice";
import { NavLink } from "react-router-dom";

const MovieRooms = () => {
  const dispatch = useDispatch();
  const {MoviesRooms } =
    useSelector(selectMovieData);
  const [styles, setStyles] = useState([
    {
      transform: "rotateY(0deg) rotateX(0deg)",
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      image: `${roomFirst}`,
    },
    {
      transform: "rotateY(0deg) rotateX(0deg)",
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      image: `${roomSecond}`,
    },
    {
      transform: "rotateY(0deg) rotateX(0deg)",
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      image: `${roomThree}`,
    },
    {
      transform: "rotateY(0deg) rotateX(0deg)",
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      image: `${roomFour}`,
    },
  ]);

  useEffect(() => {
    dispatch(requestGetRoomsData());
  }, [dispatch]);

  const MoviesRoomsAll =
    MoviesRooms?.length > 0 &&
    MoviesRooms.map((el, index) => ({
      ...el,
      ...styles[index],
    }));

  const MoviesRoomsAllFirst = MoviesRoomsAll && MoviesRoomsAll?.slice(0, 2);
  const MoviesRoomsAllSecond = MoviesRoomsAll && MoviesRoomsAll?.slice(2, 4);

  const handleMouseMove = (index, image) => (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setStyles((prevStyles) =>
      prevStyles.map((style, i) =>
        i === index
          ? {
              transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
              boxShadow: `${-rotateY * 2}px ${
                rotateX * 2
              }px 20px rgba(0, 0, 0, 0.2)`,
              image,
            }
          : style
      )
    );
  };

  const handleMouseLeave = (index, image) => () => {
    setStyles((prevStyles) =>
      prevStyles.map((style, i) =>
        i === index
          ? {
              transform: "rotateY(0deg) rotateX(0deg)",
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
              image,
            }
          : style
      )
    );
  };

  return (
    <div className="MovieRooms">
      <div className="MovieRooms-top">
        <h1>Rooms</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="row-inner">
            {MoviesRoomsAllFirst?.length > 0 &&
              MoviesRoomsAllFirst?.map((el, index) => (
                <NavLink
                  to={`room/${el?.id}`}
                  key={index}
                  className="col"
                  onMouseMove={handleMouseMove(index, el?.image)}
                  onMouseLeave={handleMouseLeave(index, el?.image)}
                  style={{
                    transform: el?.transform,
                    boxShadow: el?.boxShadow,
                  }}
                >
                  <img src={el?.image} alt={`Room ${index + 1}`} />
                  <h1>{el?.name}</h1>
                </NavLink>
              ))}
          </div>
          <div className="row-inner">
            {MoviesRoomsAllSecond?.length > 0 &&
              MoviesRoomsAllSecond?.map((el, index) => (
                <NavLink
                  to={`room/${el?.id}`}
                  key={index + 2} 
                  className="col"
                  onMouseMove={handleMouseMove(index + 2, el?.image)} 
                  onMouseLeave={handleMouseLeave(index + 2, el?.image)}
                  style={{
                    transform: el?.transform,
                    boxShadow: el?.boxShadow,
                  }}
                >
                  <img src={el?.image} alt={`Room ${index + 3}`} />
                  <h1>{el?.name}</h1>
                </NavLink>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRooms;
