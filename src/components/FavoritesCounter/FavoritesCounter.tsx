import { useFavorites } from "../../context/FavoritesContext";
import styles from "./FavoritesCounter.module.css";

const FavoritesCounter = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.counter}>
      <span className={styles.icon}>❤️</span>
      <span className={styles.count}>{favorites.length}</span>
    </div>
  );
};

export default FavoritesCounter;
