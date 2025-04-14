import SalesGrid from "./pages/SalesGrid";
import "./styles/App.css";

function App() {
  return (
    <>
      <p className="font-color-red-400 flex text-red-400">
        Vite Application with TypeScript
      </p>
      <p>Chamada da API criada usando o FastApi</p>
      <SalesGrid />
    </>
  );
}

export default App;
