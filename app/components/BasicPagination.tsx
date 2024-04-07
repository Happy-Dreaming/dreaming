import * as React from "react";
import Pagination from "@mui/material/Pagination";

interface BasicPaginationProps {
    count: number; // 총 페이지 수
    page: number; // 현재 페이지 번호
    onChange: (event: React.ChangeEvent<unknown>, page: number) => void; // 페이지 변경 이벤트 핸들러
}

const BasicPagination: React.FC<BasicPaginationProps> = ({
    count,
    page,
    onChange,
}) => {
    return (
        <Pagination
            count={count}
            page={page}
            onChange={onChange}
            sx={{
                "& .MuiPaginationItem-root": {
                    color: "#b0b0b0", // 원하는 색상
                },
                "& .Mui-selected": {
                    backgroundColor: "#53aaaf12",
                    color: "#53aaaf", // 선택된 페이지 번호의 글자 색상
                },
                "& .MuiPaginationItem-icon": {
                    fill: "#b0b0b0", // 화살표 등 아이콘 색상
                },
                ".MuiPaginationItem-root": {
                    // 여기에 커스텀 스타일을 추가하세요.
                    minWidth: "1.25rem", // 최소 너비 조정
                    height: "1.25rem", // 높이 조정
                    margin: "0 0.125rem", // 마진 조정
                    "& .MuiSvgIcon-root": {
                        // 아이콘 크기 조정
                        fontSize: "1rem",
                    },
                },
            }}
        />
    );
};

export default BasicPagination;
