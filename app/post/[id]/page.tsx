"use client";

import React, { useState, useEffect } from "react";
import styles from "../post.module.css";
import { usePathname, useRouter } from "next/navigation";
import { getDiary, patchDiary } from "../../api/service/diary";
import { useAxios } from "../../hooks/useAxios";
import { ReadProps } from "../../read/[id]/page";

interface InputData {
    title: string;
    contents: string;
    isShare: boolean;
    updated_At: string;
    // date: string;
}

function PostPage() {
    const router = useRouter();
    const diaryId = usePathname().slice(5);
    const [today, setToday] = useState<string>();
    const [inputData, setInputData] = useState<InputData>({
        title: "",
        contents: "",
        isShare: false,
        updated_At: "",
    });
    const [data, setData] = useState<ReadProps | null>(null);

    // input 데이터 갱신
    const handleInputChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = event.target;
        // isShare를 변경할 때 문자열을 boolean으로 변환
        const updatedValue = name === "isShare" ? value === "true" : value;
        setInputData((prevInputData) => ({
            ...prevInputData,
            [name]: updatedValue,
        }));
    };

    // 저장
    const handleSubmit = async (event: any) => {
        event.preventDefault(); // 폼 제출에 의한 페이지 리로드 방지
        console.log(inputData);
        // [api] patch 요청
        await patchDiary(
            diaryId,
            inputData.title,
            inputData.contents,
            inputData.isShare // 직접 사용
        );
        // 바로 전 화면으로 이동
        router.back();
    };

    // [api] 글 불러오기
    useEffect(() => {
        (async () => {
            try {
                const data = await getDiary(diaryId);
                setInputData(data);
                console.log(data);
            } catch (error) {
                console.error(
                    "다이어리 목록을 불러오는 데 실패했습니다.",
                    error
                );
            }
        })();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.postHeader}>
                <p className={styles.postHeaderTitle}>오늘의 꿈 일기</p>
                <button className={styles.submitBtn} onClick={handleSubmit}>
                    저장
                </button>
            </div>
            <form className={styles.postForm}>
                <div className={styles.postInfo}>
                    {/* 입력 1 : 공개 범위 */}
                    {/* {inputData.isShare ? (
                        <>
                            <select
                                className={styles.postView}
                                name="isShare"
                                value={Number(inputData.isShare)}
                                onChange={handleInputChange}
                            >
                                <option value={inputData.isShare.toString()}>
                                    나만보기
                                </option>
                                <option value={inputData.isShare.toString()}>
                                    전체보기
                                </option>
                            </select>
                        </>
                    ) : null} */}
                    <select
                        className={styles.postView}
                        name="isShare"
                        value={inputData.isShare.toString()} // 현재 상태를 문자열로 변환하여 value로 설정
                        onChange={handleInputChange}
                    >
                        <option value={false.toString()}>나만보기</option>
                        <option value={true.toString()}>전체보기</option>
                    </select>

                    {/* 입력 2 : 날짜 */}
                    <p className={styles.postDate}>{inputData.updated_At}</p>
                </div>

                <div className={styles.postBox}>
                    {/* 입력 3 : 제목 */}
                    <input
                        type="text"
                        placeholder="제목을 작성하세요"
                        className={styles.postTitle}
                        value={inputData.title}
                        name="title"
                        onChange={handleInputChange}
                    ></input>

                    {/* 입력 4 : 본문 */}
                    <textarea
                        placeholder="본문을 작성하세요"
                        className={styles.postContent}
                        value={inputData.contents}
                        name="contents"
                        onChange={handleInputChange}
                    ></textarea>
                </div>
            </form>
        </div>
    );
}

export default PostPage;
