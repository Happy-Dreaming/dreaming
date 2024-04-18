import axios from "axios";
import { GET } from "../refresh_token/route";
import { axiosInstance } from "../../lib/api";

/*
<hall of fame 관련 api>
1. 명예의 전당 글 불러오기
*/

// [get] 베스트 글 불러오기
export const getHallOfFame = async () => {
    try {
        const response = await axiosInstance({
            method: "GET",
            url: "/api/best-posts",
        });
        // 응답 결과 : dictionary[] / total
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
