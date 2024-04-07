"use client";

import React, { useState } from "react";
import styles from "./diary.module.css";
import LinkToDiary from "../components/LinkToDiary/LinkToDiary";
import Pagination from "@mui/material/Pagination";

import { GrMoney } from "react-icons/gr";
import LinkToReport from "../components/LinkToReport/LinkToReport";
import Diary from "../components/Diary/Diary";
import BasicPagination from "../components/BasicPagination";

function DiaryPage() {
    const [page, setPage] = useState(0); // 현재 페이지
    const [totalPages, setTotalPages] = useState(0); // 총 데이터 수

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value - 1); // 페이지 변경 시 현재 페이지 상태 업데이트
    };

    return (
        <div className={styles.container}>
            <div className={styles.headBox}>
                <div className={styles.userBox}>
                    <p className={styles.hello}>반가워요!</p>
                    <div className={styles.user}>
                        <p className={styles.username}>user-1010 님</p>
                        <p className={styles.point}>
                            <GrMoney /> <p>1000 p</p>
                        </p>
                    </div>
                </div>
                <div className={styles.widgets}>
                    <LinkToDiary />
                    <LinkToReport />
                </div>
            </div>

            <div className={styles.postBox}>
                <p className={styles.postsTitle}>꿈 일기 목록</p>
                <Diary />
                <Diary />
                <Diary />
                <Diary />
                <Diary />
                <Diary />

                {/* 페이지네이션 */}
                <div className={styles.pagination}>
                    <BasicPagination
                        count={10}
                        page={page + 1}
                        onChange={handleChangePage}
                    />
                </div>
            </div>
        </div>
    );
}

export default DiaryPage;
