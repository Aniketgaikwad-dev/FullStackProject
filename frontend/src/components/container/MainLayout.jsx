import React, { useEffect, useState } from "react";
import styles from "./MainLayout.module.css";
import PlayGround from "../pages/PlayGround";

export default function MainLayout() {
  var ws = null;

  useEffect(() => {
    makeconnection();
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);
  const makeconnection = () => {
    ws = new WebSocket("ws://localhost:8000/ws");
    try {
      ws.onopen = () => ws.send("Connected");
    } catch {}
    onmeaage();
  };
  const onmeaage = () => {
    ws.onmessage = (event) => {
      console.log("WebSocket message received:", event);
    };
  };
  return (
    <div className={styles.MainLayout__container}>
      <PlayGround />
    </div>
  );
}
