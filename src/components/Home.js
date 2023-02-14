import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import VideoContainer from "./VideoContainer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex ">
        <Sidebar />
        <VideoContainer />
      </div>
    </div>
  );
};

export default Home;
