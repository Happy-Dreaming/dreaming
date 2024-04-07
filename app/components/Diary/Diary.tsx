import React from "react";
import styles from "./Diary.module.css";
import Link from "next/link";
// import theme from "../styles/theme";

import { BsQuote } from "react-icons/bs";
import { MdLock } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { BsChatDotsFill } from "react-icons/bs";

function Diary() {
    return (
        <Link href="/read">
            <div className={styles.container}>
                <p className={styles.title}>
                    제목 <MdLock className={styles.lockIcon} />
                </p>
                <p className={styles.content}>글 내용 미리보기</p>
                <div className={styles.postFooter}>
                    <div className={styles.postInfo}>
                        <p>
                            <BsFillPersonFill className={styles.postInfoIcon} />{" "}
                            효키키
                        </p>
                        <p>
                            <BsHeartFill className={styles.postInfoIcon} /> 100
                        </p>
                        <p>
                            <BsChatDotsFill className={styles.postInfoIcon} />{" "}
                            200
                        </p>
                    </div>
                    <p className={styles.date}>2024.04.05</p>
                </div>
            </div>
        </Link>
    );
}

export default Diary;
