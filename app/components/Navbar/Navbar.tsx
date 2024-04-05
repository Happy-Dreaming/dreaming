import React from "react";
import styles from "./navbar.module.css";
// import { StyledLink } from "../styles/StyledLink.js";
// import theme from "../styles/theme";
import Link from "next/link.js";

// ==== icon
import { BsFillHouseFill } from "react-icons/bs";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { BsChatSquareQuoteFill } from "react-icons/bs";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { Bs7CircleFill } from "react-icons/bs";

function Navbar() {
    return (
        <div className={styles.container}>
            <Link href="/main" className={styles.link}>
                <div className={styles.menu1}>
                    <div className={styles.menuIcon}>
                        <BsFillHouseFill />
                    </div>
                    홈
                </div>
            </Link>
            <Link href="/diary" className={styles.link}>
                <div className={styles.menu1}>
                    <div className={styles.menuIcon}>
                        <BsFillMoonStarsFill />
                    </div>
                    다이어리
                </div>
            </Link>
            <Link href="/community" className={styles.link}>
                <div className={styles.menu1}>
                    <div className={styles.menuIcon}>
                        <BsChatSquareQuoteFill />
                    </div>
                    커뮤니티
                </div>
            </Link>
            <Link href="/dictionary" className={styles.link}>
                <div className={styles.menu1}>
                    <div className={styles.menuIcon}>
                        <BsFillPatchQuestionFill />
                    </div>
                    꿈 해몽
                </div>
            </Link>
            <Link href="/map" className={styles.link}>
                <div className={styles.menu1}>
                    <div className={styles.menuIcon}>
                        <Bs7CircleFill />
                    </div>
                    복권
                </div>
            </Link>
        </div>
    );
}

export default Navbar;
