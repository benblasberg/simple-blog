import "./App.css";
import Blog from "./containers/Blog/Blog";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Blog />
      </Router>
    </div>
  );
}

export default App;
