import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext.js";
import FavoritesCounter from "./components/FavoritesCounter/FavoritesCounter.js";
import Home from "./pages/Home.js";
import DogDetail from "./pages/DogDetail.js";
import styles from "./App.module.css";
import "./App.css";

function App() {
  return (
    <Router>
      <FavoritesProvider>
        <div>
          <header className={styles.header}>
            <h1 className={styles.title}>Dog Breeds</h1>
            <FavoritesCounter />
          </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dog/:breed" element={<DogDetail />} />
          </Routes>
        </div>
      </FavoritesProvider>
    </Router>
  );
}

export default App;
