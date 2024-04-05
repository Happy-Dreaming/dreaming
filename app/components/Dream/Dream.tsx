import React from "react";
import styles from "./Dream.module.css";

function Dream() {
    return (
        <div className={styles.container}>
            <p className={styles.title}>봄날의 기억 꿈</p>
            <p className={styles.content}>
                차가운 계절이 지나고 봄이 또 찾아왔죠. 이렇게 시린 겨울을 우린
                잘 버텨냈네요. 앞으로 해야 할 것들은 너무 넘쳐나지만. 계절의
                포근함으로 또 이겨내야죠.
            </p>
        </div>
    );
}

export default Dream;
