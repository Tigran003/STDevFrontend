import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Pages/Layout/Layout";
import MoviePage from "../Pages/MoviePage/MoviePage";
import MovieRoomPage from "../Pages/MovieRoomPage/MovieRoomPage";
import MovieDetail from "../Pages/MovieDetail/MovieDetail";

const AppRoutes = () => {
  return (
    <div className="AppRoutes">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MoviePage />} />
          <Route path="room/:id" element={<MovieRoomPage/>}/>
          <Route path="room/:id/:movie" element={<MovieDetail/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
