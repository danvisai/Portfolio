import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
        
          "Developer",
          "Graphics Programmer",
          "VR Developer in Unity and Unreal",
          "PCCET certified| Cybersecurity Enthusiast",
          "Blockchain Developer",
          "Open Source Contributor",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
