import React from "react";

function MainImg(props) {
  return (
    <div
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0) 39%, rgba(0,0,0,0) 41%, rgba(0,0,0,.65) 100%),url('${props.img}'),#1c1c1c`,
        height: "500px",
        //backgroundSize: "100px,center",
        width: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          maxWidth: "5oopx",
          bottom: "2rem",
          marginLeft: "2rem",
        }}
      >
        <h2 style={{ color: "white" }}>{props.title}</h2>
        <p style={{ color: "white", fontSize: "1rem", width: "400px" }}>
          {props.text}
        </p>
      </div>
    </div>
  );
}

export default MainImg;
