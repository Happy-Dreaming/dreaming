import React from "react";
import styles from "./Comment.module.css";
import { useAxios } from "../../hooks/useAxios";
import { delComment } from "../../api/service/comment";

export interface CommentProps {
    id: string;
    comment: string;
    created_At: string;
    diaryId: string;
    updated_At: string;
    writerId: string;
}

const Comment: React.FC<CommentProps> = ({
    id,
    comment,
    diaryId,
    updated_At,
    writerId,
}) => {
    // [api] : 댓글 삭제 api
    const handleDelComment = () => {
        delComment(id);
        window.location.reload();
    };

    return (
        <div className={styles.container}>
            <div className={styles.commentHeader}>
                <p className={styles.username}>{writerId}</p>
                <div className={styles.delBtn} onClick={handleDelComment}>
                    삭제
                </div>
            </div>

            <p className={styles.content}>{comment}</p>
            <p className={styles.date}>{updated_At}</p>
        </div>
    );
};

export default Comment;
