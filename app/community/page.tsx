"use client";

import React, { useEffect, useState } from "react";
import styles from "./community.module.css";
import HallOfFame from "../components/HallOfFame/HallOfFame";
import BasicPagination from "../components/BasicPagination";
import Diary, { DiaryProps } from "../components/Diary/Diary";
import Search from "../components/Search/Search";
import { useAxios } from "../hooks/useAxios";
import { useRouter } from "next/router";

function CommunityPage() {
    const [page, setPage] = useState(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState(0); // 총 데이터 수
    // const [results, setResults] = useState([]); // 검색
    // const router = useRouter(); // 검색
    // const { keyword } = router.query; // 검색

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value); // 페이지 변경 시 현재 페이지 상태 업데이트
    };

    // [api] 모든 꿈 일기 get 요청
    const { data, error, loading } = useAxios<DiaryProps[]>(
        "/api/diaries",
        "get",
        {},
        {
            params: {
                keyword: "",
                page: 1,
            },
        }
    );

    console.log(data);

    // [api] 검색
    // useEffect(() => {
    //     if (keyword) {
    //         const { data, error, loading } = useAxios<DiaryProps[]>(
    //             "/api/diaries",
    //             "get",
    //             {},
    //             {
    //                 params: {
    //                     keyword: "",
    //                     page: 1,
    //                 },
    //             }
    //         );
    //     }
    // }, [keyword]);

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
                {data && data.length > 0 ? (
                    data.map((d) => (
                        <Diary
                            key={d.id}
                            id={d.id}
                            title={d.title}
                            isShare={d.isShare}
                            contents={d.contents}
                            like={d.like}
                            writerId={d.writerId}
                            updated_At={d.updated_At}
                        />
                    ))
                ) : (
                    <p className={styles.nothing}>등록된 일기가 없습니다.</p>
                )}
            </div>
            <div className={styles.pagination}>
                <BasicPagination
                    count={Math.round(page / 2)}
                    page={page}
                    onChange={handleChangePage}
                />
            </div>
        </div>
    );
}

export default CommunityPage;
