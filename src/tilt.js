import React from "react";

import Tilt from "react-parallax-tilt";
import "./styles.css";

const ParallaxEffect = () => (
  <Tilt className="parallax-effect" perspective={500}>
    <div className="inner-element">
      <div>React</div>
      <div>Parallax Tilt</div>
    </div>
  </Tilt>
);

export default ParallaxEffect;
