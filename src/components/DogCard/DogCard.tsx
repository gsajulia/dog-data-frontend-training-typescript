import { useNavigate } from "react-router-dom";
import styles from "./DogCard.module.css";
import emptyImage from "../../assets/fingerprint.png";
import { useFavorites } from "../../context/FavoritesContext.js";

interface DogCardProps {
  id: string;
  breed: string;
  description: string;
}

const DogCard = ({ id, breed, description }: DogCardProps) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isCurrentFavorite = isFavorite(breed);

  const handleCardClick = () => {
    navigate(`/dog/${id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(breed);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.imageContainer}>
        <img src={emptyImage} alt={breed} className={styles.image} />
      </div>
      <h2 className={styles.breed}>{breed}</h2>
      <p className={styles.description}>{description}</p>
      <button
        onClick={handleFavoriteClick}
        className={styles.favoriteBtn}
        aria-label={
          isCurrentFavorite
            ? "Remover dos favoritos"
            : "Adicionar aos favoritos"
        }
      >
        {isCurrentFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

export default DogCard;
