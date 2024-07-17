import React, { useEffect, useRef, useState } from "react";
import styles from "./PlayGround.module.css";

export default function () {
  const canvasRef = useRef(null);
  const canvasContainer = useRef(null);
  let deltaX = 95;
  let deltaY = 50;
  let bulletX = 95;
  let bulletY = 50;
  let context = null;
  let bulletArticle = null;
  let canvas = null;
  let headDirection = "right";
  let animationFrameId = null;
  const drawShape = (deltaX, deltaY, firingFag = true) => {
    if (firingFag) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
    //Our first draw
    context.fillStyle = "#FFFFFF";
    // context.fillRect(0, 0, 40, 40);\
    context.beginPath();
    context.arc(deltaX, deltaY, 5, 0, 2 * Math.PI);
    context.fill();
  };
  const drawBullets = (bulletX, bulletY) => {
    bulletArticle.clearRect(0, 0, canvas.width, canvas.height);
    bulletArticle.fillStyle = "#FFFF00";
    // bulletArticle.fillRect(0, 0, 40, 40);\
    bulletArticle.beginPath();
    bulletArticle.arc(bulletX, bulletY, 2, 0, 2 * Math.PI);
    bulletArticle.fill();
  };
  useEffect(() => {
    canvas = canvasRef.current;
    context = canvas.getContext("2d");
    drawShape(deltaX, deltaY);
    bulletArticle = canvas.getContext("2d");
    window.addEventListener("keydown", moveSomething, false);
    canvasContainer.current.addEventListener("click", fireFunction, false);
  }, []);
  function moveSomething(e) {
    switch (e.keyCode) {
      case 37:
        if (deltaX - 10 >= 0) {
          deltaX -= 10;
          headDirection = "left";
        }
        // left key pressed
        break;
      case 38:
        if (deltaY - 10 >= 10) {
          deltaY -= 10;
          headDirection = "up";
        }
        // up key pressed
        break;
      case 39:
        if (deltaX + 10 <= canvas.width) {
          deltaX += 10;
          headDirection = "right";
        }
        // right key pressed
        break;
      case 40:
        if (deltaY + 10 <= canvas.height - 5) {
          deltaY += 10;
          headDirection = "down";
        }
        // down key pressed
        break;
    }
    drawShape(deltaX, deltaY);
  }
  function fireFunction() {
    bulletX = deltaX;
    bulletY = deltaY;

    const render = (bulletDirection) => {
      switch (bulletDirection) {
        case "left":
          if (bulletX >= 0) {
            bulletX -= 5;
          } else {
            return;
          }
          break;
        case "up":
          if (bulletY >= 0) {
            bulletY -= 5;
          } else {
            return;
          }
          break;
        case "right":
          if (bulletX <= canvas.width) {
            bulletX += 5;
          } else {
            console.log("alsdflasdlf", bulletX);
            return;
          }
          break;
        case "down":
          if (bulletY <= canvas.height) {
            bulletY += 5;
          } else {
            return;
          }
          break;
      }
      drawBullets(bulletX, bulletY);
      drawShape(deltaX, deltaY, false);

      animationFrameId = window.requestAnimationFrame(() => {
        render(bulletDirection);
      });
    };
    render(headDirection);
  }
  return (
    <div ref={canvasContainer} className={styles.playgorund__container}>
      <canvas
        className={styles.playgorund__container__canvas}
        ref={canvasRef}
      ></canvas>
    </div>
  );
}
