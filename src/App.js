import Login from "./service/Login"
import "./styles/app.scss"
import Vote from "./service/Vote";
import { useSelector,useDispatch } from "react-redux";
import { login,logout } from "./store/modules/user";

function App() {
  const state_login = useSelector(state => state.user);
  return (
    <div className="main">
      {!state_login.user.name && <Login/>}
      {/* <Vote/> */}
    </div>
  );
}

export default App;
