import styles from './UserInfo.module.css';

const UserInfo = () => {
    return (
        <div className={styles.userInfo}>
            <div className={styles.avatar} aria-hidden="true">JD</div>
            <span className={styles.name}>John Doe</span>
        </div>
    );
};

export { UserInfo };
