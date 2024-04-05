import React from "react";
import styles from "./map.module.css";
import LinkToDiary from "../components/LinkToDiary/LinkToDiary.tsx";
import HallOfFrame from "../components/HallOfFame/HallOfFame.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";
import LinkToDictionary from "../components/LinkToDictionary/LinkToDictionary.tsx";
import Link from "next/link";

function MapPage() {
    return (
        <div className={styles.container}>
            <Link href="/lotto" className={styles.linkToLotto}>
                <div className={styles.linkTextBox}>
                    <p className={styles.linkTitle}>
                        드리밍에서 추천하는 이번 주 로또 번호!
                    </p>
                    <p className={styles.linkSubTitle}>
                        꿈 일기로 포인트를 모아 로또 번호를 추천 받아요
                    </p>
                </div>
                <img
                    src="./icon_lotto.png"
                    alt="icon"
                    className={styles.lottoIcon}
                />
            </Link>

            <div className={styles.mapTextBox}>
                <div className={styles.mapTitle}>주변 복권 판매처 지도</div>
                <div className={styles.mapSubTitle}>
                    좋은 꿈을 꾸셨다면 복권 한 장 어떠신가요?
                </div>
            </div>
            <div className={styles.map}></div>
        </div>
    );
}

export default MapPage;
