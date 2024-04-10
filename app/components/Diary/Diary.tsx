import React from "react";
import styles from "./Diary.module.css";
import Link from "next/link";
// import theme from "../styles/theme";

import { BsQuote } from "react-icons/bs";
import { MdLock } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { BsChatDotsFill } from "react-icons/bs";

export interface DiaryProps {
    id: string;
    title: string;
    isShare: boolean;
    contents: string;
    writerId: number;
    like: number;
    updated_At: string;
}

const Diary: React.FC<DiaryProps> = ({
    id,
    title,
    isShare,
    contents,
    writerId,
    like,
    updated_At,
}) => {
    return (
        //writerId 넣어서 read에 보내기
        <Link href={`/read/${id}`}>
            <div className={styles.container}>
                <p className={styles.title}>
                    {title}
                    {!isShare ? <MdLock className={styles.lockIcon} /> : null}
                </p>
                <p className={styles.content}>{contents}</p>
                <div className={styles.postFooter}>
                    <div className={styles.postInfo}>
                        <p>
                            <BsFillPersonFill className={styles.postInfoIcon} />
                            {writerId}
                        </p>
                        {isShare ? (
                            <>
                                <p>
                                    <BsHeartFill
                                        className={styles.postInfoIcon}
                                    />
                                    {like}
                                </p>
                                {/* <p>
                                    <BsChatDotsFill
                                        className={styles.postInfoIcon}
                                    />
                                    200
                                </p> */}
                            </>
                        ) : null}
                    </div>
                    <p className={styles.date}>{updated_At}</p>
                </div>
            </div>
        </Link>
    );
};

export default Diary;
