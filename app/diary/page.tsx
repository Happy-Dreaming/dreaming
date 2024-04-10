"use client";

import React, { useEffect, useState } from "react";
import styles from "./diary.module.css";
import LinkToDiary from "../components/LinkToDiary/LinkToDiary";
import Pagination from "@mui/material/Pagination";

import { GrMoney } from "react-icons/gr";
import LinkToReport from "../components/LinkToReport/LinkToReport";
import Diary, { DiaryProps } from "../components/Diary/Diary";
import BasicPagination from "../components/BasicPagination";
import { useAxios } from "../hooks/useAxios";
import { getDiaryList } from "../api/service/diary";

function DiaryPage() {
    const [page, setPage] = useState(1); // 현재 페이지
    // cosnt [pagesize, setPagezize]
    const [totalPages, setTotalPages] = useState(0); // 총 데이터 수
    const [data, setData] = useState();

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value); // 페이지 변경 시 현재 페이지 상태 업데이트
    };

    // [api] 꿈 일기 목록 get 요청
    useEffect(() => {
        (async () => {
            try {
                const data = await getDiaryList(page, 5);
                setData(data);
            } catch (error) {
                console.error(
                    "다이어리 목록을 불러오는 데 실패했습니다.",
                    error
                );
            }
        })();
    }, [page]); // 페이지 번호가 변경될 때마다 리렌더링

    // console.log(data);

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

                {/* 페이지네이션 */}
                <div className={styles.pagination}>
                    <BasicPagination
                        count={5}
                        page={page}
                        onChange={handleChangePage}
                    />
                </div>
            </div>
        </div>
    );
}

export default DiaryPage;
