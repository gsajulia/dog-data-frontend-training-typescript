import { useEffect, useState } from "react";
import DogCard from "../components/DogCard/DogCard";
import SearchBar from "../components/SearchBar/SearchBar";
import Pagination from "../components/Pagination/Pagination";
import { fetchDogBreeds } from "../service/dogService";
import { useAsync } from "../hooks/useAsync";
import styles from "./Home.module.css";

const PAGE_SIZE = 15;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error } = useAsync(
    () => fetchDogBreeds(currentPage, PAGE_SIZE),
    [currentPage],
  );

  const dogs = data?.data || [];

  const filteredDogs = dogs.filter((dog) =>
    dog.attributes.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );

  const hasNextPage = dogs.length === PAGE_SIZE;
  const hasPrevPage = currentPage > 1;

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

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
              id={dog.id || ""}
              breed={dog.attributes.name}
              description={dog.attributes.description}
            />
          ))}

        {!loading && !filteredDogs.length && !error && (
          <p className={styles.noResults}>
            No results found. Try another breed!
          </p>
        )}

        {loading && <p className={styles.noResults}>Loading...</p>}
      </div>

      {!error && !loading && filteredDogs.length > 0 && (
        <Pagination
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      )}
    </div>
  );
};

export default Home;
