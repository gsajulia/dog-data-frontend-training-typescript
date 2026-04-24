import { createContext, useContext, useState, type ReactNode } from "react";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (breed: string) => void;
  isFavorite: (breed: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (breed: string) => {
    setFavorites((prev) =>
      prev.includes(breed) ? prev.filter((b) => b !== breed) : [...prev, breed],
    );
  };

  const isFavorite = (breed: string) => favorites.includes(breed);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites deve estar dentro de FavoritesProvider");
  return context;
};
