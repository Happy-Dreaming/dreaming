import React from "react";
import styles from "./linkToDiary.module.css";
import Link from "next/link";
// import theme from "../styles/theme";

function LinkToDiary() {
    return (
        <Link href="/postDiary">
            <div className={styles.container}>
                <div className={styles.icon}>
                    <img src="/icon_moon.png" alt="icon" />
                </div>
                <div className={styles.instructions}>
                    <p className={styles.title}>꿈 다이어리</p>
                    <p className={styles.subTitle}>
                        오늘은 어떤 꿈을 꾸셨나요?
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default LinkToDiary;
