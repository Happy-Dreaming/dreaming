import axios from "axios";
import { GET } from "../refresh_token/route";

/*
<diary 관련 api>
1. 유저가 작성한 다이어리 전체 목록 조회
2. 특정 다이어리 조회
3. 다이어리 작성
4. 다이어리 수정
5. 다이어리 삭제
*/

// [get] 유저의 전체 다이어리 조회
export const getDiaryList = async (page: number, pageSize: number) => {
    try {
        const response = await axios({
            method: "GET",
            url: "/api/diary",
            params: {
                page: page,
                pageSize: pageSize,
            },
        });
        // 응답 결과 : id / title / contents / writerId / like / isShare / created_At / updated_At
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// [get] 유저의 특정 다이어리 조회
export const getDiary = async (diaryId: number) => {
    try {
        const response = await axios({
            method: "GET",
            url: `/api/diary/${diaryId}`,
        });
        // 응답 결과 : id / title / contents / writerId / like / isShare / created_At / updated_At
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// [post] 다이어리 작성하기
export const postDiary = async (
    title: string,
    content: string,
    isShare: boolean
) => {
    try {
        // 요청 : title / content / isShare
        const response = await axios({
            method: "POST",
            url: "/api/diary",
            data: {
                title: title,
                content: content,
                isShare: isShare,
            },
        });
        // 응답 결과 : id / title / contents / writerId / like / isShare / created_At / updated_At
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// [patch] 일기 수정하기
export const patchDiary = async (
    diaryId: number,
    title: string,
    content: string,
    isShare: string
) => {
    try {
        // 요청 : title / content / isShare
        const response = await axios({
            method: "PATCH",
            url: `/api/diary/${diaryId}`,
            data: {
                title: title,
                content: content,
                isShare: isShare,
            },
        });
        // 응답 결과 : id / title / contents / writerId / like / isShare / created_At / updated_At
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// [delete] 일기 삭제하기
export const deleteDiary = async (diaryId: number) => {
    try {
        const response = await axios({
            method: "DELETE",
            url: `/api/diary/${diaryId}`,
        });
        // 응답 결과 : data
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
