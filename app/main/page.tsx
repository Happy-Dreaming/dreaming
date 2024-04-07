import React from "react";
import styles from "./main.module.css";
import LinkToDiary from "../components/LinkToDiary/LinkToDiary.tsx";
import HallOfFrame from "../components/HallOfFame/HallOfFame.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";
import LinkToDictionary from "../components/LinkToDictionary/LinkToDictionary.tsx";

function MainPage() {
    return (
        <div className={styles.container}>
            <div className={styles.banner}></div>
            <div className={styles.diary}>
                <LinkToDiary />
                <LinkToDictionary />
            </div>
            <div className={styles.award}>
                <HallOfFrame />
            </div>
        </div>
    );
}

export default MainPage;
