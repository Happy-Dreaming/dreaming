"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./read.module.css";
import Comment from "../../components/Comment/Comment";
import { usePathname, useRouter } from "next/navigation";

import { BsHeartFill } from "react-icons/bs";
import { BsChatDotsFill } from "react-icons/bs";
import { useAxios } from "../../hooks/useAxios";
import { postComment } from "../../api/service/comment";

export interface ReadProps {
    comments: string[];
    contents: string;
    created_At: string;
    id: string;
    isShare: boolean;
    like: number;
    title: string;
    updated_At: string;
    writerId: string;
}

function ReadPage() {
    const router = useRouter();
    const pathname = usePathname().slice(6);

    // 댓글
    const [inputComment, setInputComment] = useState("");
    const [saveComment, setSaveComment] = useState("");

    const handleInputComment = (event: ChangeEvent<HTMLInputElement>) => {
        setInputComment(event.target.value);
    };

    const comment = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setInputComment(inputComment);
        // [api] 댓글 post 요청
        postComment(pathname, inputComment);
        window.location.reload();
    };

    // [api] 모든 꿈 일기 get 요청
    const { data, error, loading } = useAxios<ReadProps[]>(
        `/api/diary/${pathname}`,
        "get",
        {},
        {}
    );

    return (
        <div className={styles.container}>
            <div className={styles.postBox}>
                <div className={styles.postHeaderBox}>
                    <p className={styles.postWriter}>{data?.writerId}</p>
                    {/* 작성자에게만 보이는 버튼 */}
                    <div className={styles.postBtns}>
                        <div className={styles.postEditBtn}>수정</div>
                        <div className={styles.postDelBtn}>삭제</div>
                    </div>
                </div>
                <div className={styles.postTitle}>{data?.title}</div>
                <div className={styles.postContent}>{data?.contents}</div>
                <div className={styles.postFooterBox}>
                    <div className={styles.postReactionBox}>
                        <BsHeartFill />
                        <p className={styles.postLike}>{data?.like}</p>
                        <BsChatDotsFill />
                        <p className={styles.postComment}>
                            {data?.comments.length}
                        </p>
                    </div>
                    <p className={styles.postDate}>{data?.updated_At}</p>
                </div>
            </div>

            {/* 댓글 컴포넌트 */}
            <div className={styles.commentBox}>
                {data?.comments.length > 0
                    ? data?.comments.map((c, index) => (
                          <Comment
                              key={c.id}
                              id={c.id}
                              comment={c.comment}
                              created_At={c.created_At}
                              diaryId={c.diaryId}
                              updated_At={c.updated_At}
                              writerId={c.writerId}
                          />
                      ))
                    : null}
            </div>

            {/* 리액션바 : 좋아요, 댓글 */}
            {data?.isShare ? (
                <div className={styles.reactionBarBg}>
                    <div className={styles.reactionBarBox}>
                        <div className={styles.reactionLike}>
                            <BsHeartFill className={styles.reactionLikeIcon} />
                        </div>
                        <form
                            onSubmit={comment}
                            className={styles.commentBarForm}
                        >
                            <input
                                type="text"
                                placeholder="여기에 댓글을 입력하세요."
                                value={inputComment}
                                onChange={handleInputComment}
                                className={styles.commentBar}
                            />
                            <button type="submit" className={styles.submitBtn}>
                                저장
                            </button>
                        </form>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default ReadPage;
