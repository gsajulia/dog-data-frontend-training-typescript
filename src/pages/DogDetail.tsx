import { useParams, useNavigate } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { fetchDogBreedById } from "../service/dogService";
import { useFavorites } from "../context/FavoritesContext";
import emptyImage from "../assets/fingerprint.png";
import styles from "./DogDetail.module.css";
import type { DogProps } from "../types/dogs";

const DogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: dog, loading } = useAsync<DogProps | null>(
    () => (id ? fetchDogBreedById(id) : Promise.resolve(null)),
    [],
  );
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading) {
    return (
      <div className={styles.detail}>
        <button onClick={() => navigate("/")} className={styles.backBtn}>
          ← Voltar
        </button>
        <p className={styles.loading}>Carregando...</p>
      </div>
    );
  }

  if (!dog) {
    return (
      <div className={styles.detail}>
        <button onClick={() => navigate("/")} className={styles.backBtn}>
          ← Voltar
        </button>
        <p className={styles.notFound}>Cão não encontrado</p>
      </div>
    );
  }

  const isCurrentFavorite = isFavorite(dog.attributes.name);

  return (
    <div className={styles.detail}>
      <button onClick={() => navigate("/")} className={styles.backBtn}>
        ← Voltar
      </button>
      <div className={styles.content}>
        <div className={styles.imageSection}>
          <img
            src={emptyImage}
            alt={dog.attributes.name}
            className={styles.image}
          />
        </div>
        <div className={styles.infoSection}>
          <h1 className={styles.breed}>{dog.attributes.name}</h1>
          <button
            onClick={() => toggleFavorite(dog.attributes.name)}
            className={styles.favoriteBtn}
          >
            {isCurrentFavorite
              ? "❤️ Remover dos Favoritos"
              : "🤍 Adicionar aos Favoritos"}
          </button>
          <p className={styles.description}>{dog.attributes.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DogDetail;
