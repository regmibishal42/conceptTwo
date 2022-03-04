import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@mui/material";
import {Instagram} from "@mui/icons-material";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/meabhisingh";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src=""
              alt="Founder"
            />
            <Typography>Bishal Regmi</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by Vishal Regmi, Aayush Aryal and Grishma Shrestha as a Fifth Semester Project for Kantipur City College
            </span>
          </div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src=""
              alt="Founder"
            />
            <Typography>Bishal Regmi</Typography>
            <Button onClick={()=>window.location('https://instagram.com/meabhisingh')} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by Vishal Regmi, Aayush Aryal and Grishma Shrestha as a Fifth Semester Project for Kantipur City College
            </span>
          </div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src=""
              alt="Founder"
            />
            <Typography>Bishal Regmi</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by Vishal Regmi, Aayush Aryal and Grishma Shrestha as a Fifth Semester Project for Kantipur City College
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
