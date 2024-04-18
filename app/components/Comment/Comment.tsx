import { useSession } from "next-auth/react";
import swal from "sweetalert";
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
    writerName: string;
    writerPicture: string;
}

const Comment: React.FC<CommentProps> = ({
    id,
    comment,
    diaryId,
    updated_At,
    writerId,
    writerName,
    writerPicture,
}) => {
    // [api] : 댓글 삭제 api
    const session = useSession().data?.user as { sub: string };
    const handleDelComment = async () => {
        const result = await swal({
            title: "삭제하시겠습니까?",
            text: "삭제를 원하면 '확인'을 누르세요.",
            icon: "warning",
            dangerMode: true,
        });

        // 사용자가 '확인'을 눌렀다면, 결과는 true가 됩니다.
        if (result) {
            await delComment(id);
            window.location.reload();
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.commentHeader}>
                <p className={styles.username}>{writerName}</p>
                {session && session?.sub === writerId && (
                    <div className={styles.delBtn} onClick={handleDelComment}>
                        삭제
                    </div>
                )}
            </div>

            <p className={styles.content}>{comment}</p>
            <p className={styles.date}>{updated_At}</p>
        </div>
    );
};

export default Comment;
