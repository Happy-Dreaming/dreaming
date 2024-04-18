"use client";

import React, { useEffect, useState } from "react";
import styles from "./hallOfFame.module.css";
import { useAxios } from "../../hooks/useAxios";
import { getHallOfFame } from "../../api/service/hallOfFame";
import Link from "next/link";

interface HallOfFameProps {
    id: string;
    title: string;
    contents: string;
    writerId: string;
    like: number;
    isShare: boolean;
    created_At: string;
    updated_At: string;
}

function HallOfFame() {
    const [data, setData] = useState<HallOfFameProps[]>([]);
    // [api] 명예의 전당 get 요청
    // const { data, error, loading } = useAxios<HallOfFameProps[]>(
    //     `/api/best-posts`,
    //     "get",
    //     {},
    //     {}
    // );

    // [api] 꿈 일기 목록 get 요청
    useEffect(() => {
        (async () => {
            try {
                const data = await getHallOfFame();
                setData(data);
                console.log(data.diaries);
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
            <div className={styles.intro}>
                <p className={styles.title}>명예의 전당</p>
                <p className={styles.subTitle}>
                    한 달간 가장 많은 사랑을 받은 꿈 이야기
                </p>
            </div>

            <div className={styles.hallOfFrame}>
                {data
                    ? data?.slice(0, 3).map((d, index) => (
                          // eslint-disable-next-line react/jsx-key
                          <Link href={`/read/${d.id}`}>
                              <div
                                  key={index}
                                  className={styles.rankBox}
                                  data-aos="flip-up"
                                  data-aos-duration="2000"
                                  data-aos-delay={index * 100}
                              >
                                  <p className={styles.rank}>{index + 1}</p>
                                  <div className={styles.diary}>
                                      <p className={styles.diary_title}>
                                          {d.title}
                                      </p>
                                      <p className={styles.diary_preview}>
                                          {/* {d.contents} */}
                                          {d.contents.length >= 55
                                              ? d.contents.slice(0, 55) + " ..."
                                              : d.contents}
                                      </p>
                                  </div>
                              </div>
                          </Link>
                      ))
                    : null}
                {/* <div className={styles.rankBox}>
                    <p className={styles.rank}>1</p>
                    <div className={styles.diary}>
                        <p className={styles.diary_title}>제목</p>
                        <p className={styles.diary_preview}>미리보기</p>
                    </div>
                </div>
                <div className={styles.rankBox}>
                    <p className={styles.rank}>2</p>
                    <div className={styles.diary}>
                        <p className={styles.diary_title}>제목</p>
                        <p className={styles.diary_preview}>미리보기</p>
                    </div>
                </div>
                <div className={styles.rankBox}>
                    <p className={styles.rank}>3</p>
                    <div className={styles.diary}>
                        <p className={styles.diary_title}>제목</p>
                        <p className={styles.diary_preview}>미리보기</p>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default HallOfFame;
