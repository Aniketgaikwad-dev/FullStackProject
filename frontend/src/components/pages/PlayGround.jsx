import React, { useEffect, useRef, useState } from "react";
import styles from "./PlayGround.module.css";
import axios from "axios";
import { fetchData } from "../../utils/fetchData";

export default function () {
  // useEffect(() => {
  //   const questionList = fetchData();
  //   console.log(questionList);
  // }, []);
  return (
    <div className={styles.playgorund__container}>
      {/* <p>{process.env.REACT_APP_QUIZ_API}</p>
      <canvas
        className={styles.playgorund__container__canvas}
        ref={canvasRef}
      ></canvas> */}
    </div>
  );
}
