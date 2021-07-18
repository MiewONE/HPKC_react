import Login from "./service/Login"
import "./styles/app.scss"
import Vote from "./service/Vote";
function App() {

  return (
    <div className="main">
      <Login/>
      <Vote/>
    </div>
  );
}

export default App;
