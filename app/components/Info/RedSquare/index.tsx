import styles from "../Info.module.scss";

function index({ onClick }: { onClick: () => void }) {
  return <button className={styles.redSquare} onClick={onClick} />;
}

export default index;
