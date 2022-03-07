import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@mui/material";
import aayush from '../../../images/aayush.jpg';
import bishal from '../../../images/bishal.jpg';
import grishma from '../../../images/grishma.jpg';
const About = () => {

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
              src={bishal}
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
              src={aayush}
              alt="Founder"
            />
            <Typography>Aayush Aryal</Typography>
            <Button onClick={()=>window.location('https://instagram.com/meabhisingh')} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample website made by Vishal Regmi, Aayush Aryal and Grishma Shrestha as a Fifth Semester Project for Kantipur City College
            </span>
          </div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={grishma}
              alt="Founder"
            />
            <Typography>Grishma Shrestha</Typography>
            <Button onClick={()=>window.location('https://instagram.com/meabhisingh')} color="primary">
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
