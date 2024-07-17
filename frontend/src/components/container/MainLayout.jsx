import React from "react";
import styles from "./MainLayout.module.css";
import PlayGround from "../pages/PlayGround";

export default function MainLayout() {
  return (
    <div className={styles.MainLayout__container}>
      <PlayGround />
    </div>
  );
}
