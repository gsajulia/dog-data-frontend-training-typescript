import DogList from "./components/DogList/DogList.js";
import styles from "./App.module.css";
import "./App.css";

function App() {
  return (
    <div>
      <h1 className={styles.title}>Dog Breeds</h1>
      <DogList />
    </div>
  );
}

export default App;
