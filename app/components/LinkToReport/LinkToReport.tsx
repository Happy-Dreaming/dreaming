import React from "react";
import styles from "./LinkToReport.module.css";
import Link from "next/link";
// import theme from "../styles/theme";

function LinkToReport() {
    return (
        <Link href="/dictionary">
            <div className={styles.container}>
                <div className={styles.instructions}>
                    <p className={styles.title}>드리밍 리포트</p>
                    <p className={styles.subTitle}>내 일기의 통계 구경하기</p>
                </div>
                <div className={styles.icon}>
                    <img src="/icon_report.png" alt="icon" />
                </div>
            </div>
        </Link>
    );
}

export default LinkToReport;
