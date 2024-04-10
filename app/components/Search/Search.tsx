"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Search.module.css";
import { useRouter } from "next/router";

function CommunityPage() {
    // 검색
    const [inputKeyword, setInputKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    // const router = useRouter();

    const handleInputKeyword = (event: ChangeEvent<HTMLInputElement>) => {
        setInputKeyword(event.target.value);
    };

    const search = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearchKeyword(inputKeyword);
        console.log(inputKeyword);

        // if (inputKeyword.trim()) {
        //     router.push({
        //         pathname: "/community",
        //         query: { keyword: inputKeyword },
        //     });
        // }
    };

    return (
        <>
            <form onSubmit={search} className={styles.container}>
                <input
                    type="text"
                    placeholder="여기에 검색어를 입력하세요."
                    value={inputKeyword}
                    onChange={handleInputKeyword}
                    className={styles.searchBar}
                />
                <button type="submit" className={styles.submitBtn}>
                    검색
                </button>
            </form>
        </>
    );
}

export default CommunityPage;
