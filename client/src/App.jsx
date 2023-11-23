import "./App.css";
import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <main className="app transition-all">
      <Homepage />
      <Canvas />
      <Customizer />
    </main>
  );
}

export default App;
