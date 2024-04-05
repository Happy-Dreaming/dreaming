import React from "react";
import styles from "./LinkToDictionary.module.css";
import Link from "next/link";
// import theme from "../styles/theme";

function LinkToDictionary() {
    return (
        <Link href="/dictionary">
            <div className={styles.container}>
                <div className={styles.instructions}>
                    <p className={styles.title}>꿈 해몽 사전</p>
                    <p className={styles.subTitle}>꿈의 메시지는 무엇일까요?</p>
                </div>
                <div className={styles.icon}>
                    <img src="/icon_book.png" alt="icon" />
                </div>
            </div>
        </Link>
    );
}

export default LinkToDictionary;
