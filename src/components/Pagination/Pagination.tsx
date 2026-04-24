import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination = ({
  currentPage,
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage,
}: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={onPrevPage}
        disabled={!hasPrevPage}
      >
        ← Anterior
      </button>
      <span className={styles.pageInfo}>Página {currentPage}</span>
      <button
        className={styles.button}
        onClick={onNextPage}
        disabled={!hasNextPage}
      >
        Próxima →
      </button>
    </div>
  );
};

export default Pagination;
