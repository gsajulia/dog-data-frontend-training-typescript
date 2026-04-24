import { useState } from "react";
import DogCard from "../components/DogCard/DogCard";
import SearchBar from "../components/SearchBar/SearchBar";
import { fetchDogBreeds } from "../service/dogService";
import { useAsync } from "../hooks/useAsync";
import styles from "./Home.module.css";

interface DogProps {
  attributes: {
    name: string;
    description: string;
    image: string;
  };
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading, error } = useAsync<DogProps[]>(() => fetchDogBreeds());

  const dogs = data || [];

  const filteredDogs = dogs.filter((dog) =>
    dog.attributes.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );

  return (
    <div className={styles.wrapper}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={styles.container}>
        {error && (
          <p className={styles.noResults}>Erro ao carregar: {error.message}</p>
        )}

        {filteredDogs.length > 0 &&
          filteredDogs.map((dog, index) => (
            <DogCard
              key={index}
              breed={dog.attributes.name}
              description={dog.attributes.description}
              image={dog.attributes.image}
            />
          ))}

        {!loading && !filteredDogs.length && !error && (
          <p className={styles.noResults}>
            No results found. Try another breed!
          </p>
        )}

        {loading && <p className={styles.noResults}>Loading...</p>}
      </div>
    </div>
  );
};

export default Home;
