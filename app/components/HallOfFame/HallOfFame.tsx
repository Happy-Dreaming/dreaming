import React from "react";
import styles from "./hallOfFame.module.css";

function HallOfFame() {
    return (
        <div className={styles.container}>
            <div className={styles.intro}>
                <p className={styles.title}>명예의 전당</p>
                <p className={styles.subTitle}>
                    한 달간 가장 많은 사랑을 받은 꿈 이야기
                </p>
            </div>

            <div className={styles.hallOfFrame}>
                <div className={styles.rankBox}>
                    <p className={styles.rank}>1</p>
                    <div className={styles.diary}>
                        <p className={styles.diary_title}>제목</p>
                        <p className={styles.diary_preview}>미리보기</p>
                    </div>
                </div>
                <div className={styles.rankBox}>
                    <p className={styles.rank}>2</p>
                    <div className={styles.diary}>
                        <p className={styles.diary_title}>제목</p>
                        <p className={styles.diary_preview}>미리보기</p>
                    </div>
                </div>
                <div className={styles.rankBox}>
                    <p className={styles.rank}>3</p>
                    <div className={styles.diary}>
                        <p className={styles.diary_title}>제목</p>
                        <p className={styles.diary_preview}>미리보기</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HallOfFame;
