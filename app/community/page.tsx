"use client";

import React, { useState } from "react";
import styles from "./community.module.css";
import HallOfFame from "../components/HallOfFame/HallOfFame";
import BasicPagination from "../components/BasicPagination";
import Diary from "../components/Diary/Diary";
import Search from "../components/Search/Search";

function CommunityPage() {
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
            <div className={styles.hallOfFameBox}>
                <HallOfFame />
            </div>
            <div className={styles.searchBox}>
                <p className={styles.searchTitle}>꿈 게시글 검색</p>
                <Search />
            </div>
            <div className={styles.posts}>
                <Diary />
                <Diary />
                <Diary />
                <Diary />
                <Diary />
            </div>
            <div className={styles.pagination}>
                <BasicPagination
                    count={10}
                    page={page + 1}
                    onChange={handleChangePage}
                />
            </div>
        </div>
    );
}

export default CommunityPage;
