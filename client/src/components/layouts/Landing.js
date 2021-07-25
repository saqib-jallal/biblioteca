import React from "react";
import "./Landing.css";

const Landing = () => {
  return (
    <section id="landing">
      <div className="container">
        <div className="row center-xs center-sm center-md center-lg middle-xs middle-sm middle-md middle-lg">
          <div className="showcase col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <h1>
              Welcome to <span className="title">Biblioteca</span>
            </h1>
            <p>The Bangalore Public Library</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
