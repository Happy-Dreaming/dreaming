import axios from "axios";
import { GET } from "../refresh_token/route";

/*
<community 관련 api>
1. 명예의 전당 전체 목록 조회 -- by.효중??
2. 다이어리 검색 (+ 전체 목록 조회)
*/

// [get] 다이어리 검색
export const getCommnuity = async (keyword: string, pageNumber: number) => {
    try {
        const response = await axios({
            method: "GET",
            url: "/api/diaries",
            params: {
                search: keyword,
                page: pageNumber,
            },
        });
        // 응답 결과 : id / title / contents / writerId / like / isShare / created_At / updated_At
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
