"use client";

import React, { useState } from "react";
import styles from "./dictionary.module.css";
import Search from "../components/Search/Search";
import BasicPagination from "../components/BasicPagination";
import page from "../page";
import Dream from "../components/Dream/Dream";

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
            <div className={styles.dictionaryHeaderBox}>
                <div className={styles.dictionaryHeader}>
                    <p className={styles.dictionaryTitle}>꿈 해몽 사전</p>
                    <Search />
                    <div className={styles.categories}>
                        <p className={styles.category}>전체</p>
                        <p className={styles.category}>물을 마시는 꿈</p>
                        <p className={styles.category}>불 꿈</p>
                        <p className={styles.category}>스터디 카페에 가는 꿈</p>
                        <p className={styles.category}>물 꿈</p>
                        <p className={styles.category}>동물을 키우는 꿈</p>
                        <p className={styles.category}>동물을 키우는 꿈</p>
                        <p className={styles.category}>동물을 키우는 꿈</p>
                    </div>
                </div>
            </div>
            <div className={styles.dreams}>
                <Dream />
                <Dream />
                <Dream />
                <Dream />
                <Dream />
                <Dream />
            </div>
            {/* 페이지네이션 */}
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

export default DiaryPage;
