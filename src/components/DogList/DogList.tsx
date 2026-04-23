import { useState, useEffect } from "react";
import DogCard from "../DogCard/DogCard.js";
import SearchBar from "../SearchBar/SearchBar.js";
import styles from "./DogList.module.css";
import { fetchDogBreeds } from "../../service/dogService.js";

interface DogProps {
  attributes: {
    name: string;
    description: string;
    image: string;
  };
}

const DogList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dogs, setDogs] = useState<DogProps[]>([]);
  const [loading, setLoading] = useState(false);

  const filteredDogs = dogs.filter((dog) =>
    dog.attributes.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );

  useEffect(() => {
    const getDogBreeds = async () => {
      try {
        setLoading(true);
        const dogBreeds = await fetchDogBreeds();
        setDogs(dogBreeds);
      } catch (error) {
        console.error("Failed to fetch dog breeds:", error);
      }
      setLoading(false);
    };

    getDogBreeds();
  }, []);

  return (
    <div className={styles.wrapper}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={styles.container}>
        {filteredDogs.length > 0 &&
          filteredDogs.map((dog, index) => (
            <DogCard
              key={index}
              breed={dog.attributes.name}
              description={dog.attributes.description}
              image={dog.attributes.image}
            />
          ))}

        {!loading && !filteredDogs.length && (
          <p className={styles.noResults}>
            No results found. Try another breed!
          </p>
        )}

        {loading && <p className={styles.noResults}>Loading...</p>}
      </div>
    </div>
  );
};

export default DogList;
