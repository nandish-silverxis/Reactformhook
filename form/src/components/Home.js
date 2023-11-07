import React from "react";
import { Link, Outlet } from "react-router-dom";
import Heder from "./commen/Header";


function Home() {
  return (
    <section className="hero1">
      <div>
      
        <div
          className="content"
          style={{
            marginLeft: "320%",
            marginTop: "80%",
          }}
        >
          <h1>Welcome Home</h1>
          <div className="d-flex">
            <Link
              to="/Home"
              className="btn btn-secondary me-3"
              style={{ marginLeft: "300%" }}
            >
              Home
            </Link>
            <Link
              to="/Userdata"
              className="btn btn-secondary"
              style={{ marginLeft: "340%" }}
            >
              Employee_List
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
