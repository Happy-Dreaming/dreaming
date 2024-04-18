"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./read.module.css";
import Comment from "../../components/Comment/Comment";
import { usePathname, useRouter } from "next/navigation";
import swal from "sweetalert";
import { BsHeartFill } from "react-icons/bs";
import { BsChatDotsFill } from "react-icons/bs";
import { useAxios } from "../../hooks/useAxios";
import { postComment } from "../../api/service/comment";
import { axiosInstance } from "../../lib/api";
import { UserProps } from "../../diary/page";
import { getUser } from "../../api/service/user";
import { deleteDiary } from "../../api/service/diary";

interface Like {
    id: string;
}
interface Comment {
    id: string;
    comment: string;
    writerId: string;
    writerName: string;
    writerPicture: string;
    created_At: string;
    updated_At: string;
    diaryId: string;
}
export interface ReadProps {
    comments: Comment[];
    contents: string;
    created_At: string;
    id: string;
    likes: number;
    isShare: boolean;
    like: Like[];
    title: string;
    updated_At: string;
    writerId: string;
    writerName: string;
    writerPicture: string;
}

function ReadPage() {
    const router = useRouter();
    const pathname = usePathname().slice(6);
    const [user, setUser] = useState<UserProps[]>([]);
    const [owner, setOwner] = useState<boolean>(false);

    // 댓글
    const [inputComment, setInputComment] = useState("");
    const [saveComment, setSaveComment] = useState("");

    const handleInputComment = (event: ChangeEvent<HTMLInputElement>) => {
        setInputComment(event.target.value);
    };

    const comment = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setInputComment(inputComment);
        // [api] 댓글 post 요청
        await postComment(pathname, inputComment);
        window.location.reload();
    };

    // [api] 모든 꿈 일기 get 요청
    const { data, error, loading } = useAxios<ReadProps>(
        `/api/diary/${pathname}`,
        "get",
        {},
        {}
    );

    // [api] 좋아요
    const handleClickBsHeart = async () => {
        await axiosInstance.post("/api/diary/like", {
            diaryId: data?.id + "",
        });

        await swal("반영되었습니다");
        window.location.reload();
    };

    // [api] 글 삭제
    const handlePostDel = async (event: React.MouseEvent<HTMLDivElement>) => {
        const result = await swal({
            title: "삭제하시겠습니까?",
            text: "삭제를 원하면 '확인'을 누르세요.",
            icon: "warning",
            dangerMode: true,
        });

        if (result) {
            await deleteDiary(pathname);
            router.back();
        }
    };

    // [api] 로그인한 유저 정보 get 요청
    useEffect(() => {
        const checkOwner = async () => {
            try {
                const userData = await getUser(); // 로그인한 유저 정보 get 요청
                // 여기서 data?.writerName은 API로부터 받은 꿈 일기의 작성자 이름을 가리킵니다.
                // userData.user.name은 로그인한 유저의 이름입니다.
                // 이 두 값을 비교하여 owner 상태를 업데이트합니다.
                console.log(userData);

                if (data?.writerId === userData.id) {
                    // }
                    // if (data?.writerName && userData.user) {
                    setOwner(true);
                    console.log("dfdf");
                }
                setUser(userData.user);
            } catch (error) {
                console.error("유저 정보를 불러오는데 실패했습니다.", error);
            }
        };
        checkOwner();
    }, []);

    // [api] 글 수정
    const handlePostPatch = (event: React.MouseEvent<HTMLDivElement>) => {
        router.push(`/post/${data?.id}`);
    };

    console.log(owner);
    return (
        <div className={styles.container}>
            <div className={styles.postBox}>
                <div className={styles.postHeaderBox}>
                    <p className={styles.postWriter}>{data?.writerName}</p>
                    {/* 작성자에게만 보이는 버튼 */}
                    {owner ? (
                        <>
                            <div className={styles.postBtns}>
                                <div
                                    className={styles.postEditBtn}
                                    onClick={handlePostPatch}
                                >
                                    수정
                                </div>
                                <div
                                    className={styles.postDelBtn}
                                    onClick={handlePostDel}
                                >
                                    삭제
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>
                <div className={styles.postTitle}>{data?.title}</div>
                <div className={styles.postContent}>{data?.contents}</div>
                <div className={styles.postFooterBox}>
                    <div className={styles.postReactionBox}>
                        <BsHeartFill />
                        <p className={styles.postLike}>{data?.likes}</p>
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
                {data?.comments && data?.comments?.length > 0
                    ? data?.comments.map((c, index) => (
                          <Comment
                              key={c.id}
                              id={c.id}
                              comment={c.comment}
                              created_At={c.created_At}
                              diaryId={c.diaryId}
                              updated_At={c.updated_At}
                              writerId={c.writerId}
                              writerName={c.writerName}
                              writerPicture={c.writerPicture}
                          />
                      ))
                    : null}
            </div>

            {data?.isShare ? (
                <div className={styles.reactionBarBg}>
                    <div className={styles.reactionBarBox}>
                        <div
                            className={styles.reactionLike}
                            onClick={handleClickBsHeart}
                        >
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
