import styles from "../Info.module.scss";

function index({ onClick }: { onClick: () => void }) {
  return (
    <>
      <button className={styles.redSquare} onClick={onClick} />
      {/* <div className={styles.triangleOverflow} /> */}
    </>
  );
}

export default index;
