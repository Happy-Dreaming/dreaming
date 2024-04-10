import axios from "axios";
import { GET } from "../refresh_token/route";

/*
<comment 관련 api>
1. 댓글 생성
2. 댓글 삭제
*/

// [post] 댓글 작성
export const postComment = async (diaryId: string, comment: string) => {
    try {
        // 요청 : diaryId / comment
        const response = await axios({
            method: "POST",
            url: "/api/comment",
            data: {
                diaryId: diaryId,
                comment: comment,
            },
        });
        // 응답 결과 : id / contents
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// [delete] 댓글 삭제
export const delComment = async (commentId: string) => {
    try {
        // 요청 : commentId
        const response = await axios({
            method: "DELETE",
            url: "/api/comment",
            data: {
                commentId: commentId,
            },
        });
        // 응답 결과 : data
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
