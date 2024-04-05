"use client";

import React, { useEffect } from "react";
import styles from "./post.module.css";

function PostPage() {
    useEffect(() => {
        const datePicker = document.getElementById(
            "datePicker"
        ) as HTMLInputElement;
        const today = new Date().toISOString().split("T")[0]; // 오늘 날짜를 'yyyy-mm-dd' 형식으로 설정
        datePicker.value = today;
    }, []); // 빈 의존성 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행되도록 함

    return (
        <div className={styles.container}>
            <div className={styles.postHeader}>
                <p className={styles.postHeaderTitle}>오늘의 꿈 일기</p>
                <button className={styles.submitBtn}>저장</button>
            </div>
            <form className={styles.postForm}>
                <div className={styles.postInfo}>
                    {/* 입력 1 : 공개 범위 */}
                    <select className={styles.postView}>
                        <option value="private">나만보기</option>
                        <option value="public">전체보기</option>
                    </select>

                    {/* 입력 2 : 날짜 */}
                    <input
                        type="date"
                        id="datePicker"
                        className={styles.postDate}
                    />
                </div>

                <div className={styles.postBox}>
                    {/* 입력 3 : 제목 */}
                    <input
                        type="text"
                        placeholder="제목을 작성하세요"
                        className={styles.postTitle}
                    ></input>

                    {/* 입력 4 : 본문 */}
                    <textarea
                        placeholder="본문을 작성하세요"
                        className={styles.postContent}
                    ></textarea>
                </div>
            </form>
        </div>
    );
}

export default PostPage;
