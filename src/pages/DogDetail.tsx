import { useParams, useNavigate } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { fetchDogBreeds } from "../service/dogService";
import { useFavorites } from "../context/FavoritesContext";
import emptyImage from "../assets/fingerprint.png";
import styles from "./DogDetail.module.css";

interface DogProps {
  id?: string;
  attributes: {
    name: string;
    description: string;
    image: string;
  };
}

const DogDetail = () => {
  const { breed } = useParams<{ breed: string }>();
  const navigate = useNavigate();
  const { data, loading } = useAsync<DogProps[]>(() => fetchDogBreeds());
  const { isFavorite, toggleFavorite } = useFavorites();

  const dogs = data || [];

  const dog = dogs.find(
    (d) => d.attributes.name.toLowerCase() === breed?.toLowerCase(),
  );

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
            src={dog.attributes.image || emptyImage}
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
