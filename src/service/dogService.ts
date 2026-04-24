import type { DogProps } from "../types/dogs";
import dogs from "./mock/dogsData";

interface PaginatedResponse {
  data: Array<DogProps>;
  links?: {
    next?: string;
    prev?: string;
  };
}

const fetchDogBreeds = async (
  pageNumber: number,
  pageSize: number = 15,
): Promise<PaginatedResponse> => {
  try {
    const url = `https://dogapi.dog/api/v2/breeds?page[number]=${pageNumber}&page[size]=${pageSize}`;
    const response = await fetch(url);
    const results = await response.json();

    if (response.ok) {
      return results;
    } else {
      return { data: dogs };
    }
  } catch (error) {
    console.error("Error fetching dog breeds:", error);
    throw error;
  }
};

const fetchDogBreedById = async (id: string) => {
  try {
    const response = await fetch(`https://dogapi.dog/api/v2/breeds/${id}`);
    const results = await response.json();

    if (response.ok) {
      return results.data;
    } else {
      const dog = dogs.find((d) => d.id === id);
      return dog || null;
    }
  } catch (error) {
    console.error("Error fetching dog breed by id:", error);
    throw error;
  }
};

export { fetchDogBreeds, fetchDogBreedById };
export type { PaginatedResponse };
